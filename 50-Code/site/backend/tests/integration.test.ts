import test from "node:test";
import assert from "node:assert/strict";
import argon2 from "argon2";
import {randomUUID} from "node:crypto";
import {mkdtemp,readFile,rm} from "node:fs/promises";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {createPool} from "../src/database.ts";
import {createApp} from "../src/app.ts";
import type {Settings} from "../src/config.ts";
import {privatePath,sniff} from "../src/storage.ts";

function multipart(input:Record<string,unknown>,key:string,files:{name:string;type:string;bytes:Buffer}[]=[]){
 const boundary="boundary"+randomUUID().replaceAll("-","");
 const parts:Buffer[]=[];
 function field(name:string,value:string){
  parts.push(Buffer.from("--"+boundary+"\r\nContent-Disposition: form-data; name=\""+name+"\"\r\n\r\n"+value+"\r\n"));
 }
 field("payload",JSON.stringify(input));field("idempotency_key",key);
 for(const file of files){
  parts.push(Buffer.from("--"+boundary+"\r\nContent-Disposition: form-data; name=\"attachments\"; filename=\""+file.name+"\"\r\nContent-Type: "+file.type+"\r\n\r\n"));
  parts.push(file.bytes);parts.push(Buffer.from("\r\n"));
 }
 parts.push(Buffer.from("--"+boundary+"--\r\n"));
 return {body:Buffer.concat(parts),contentType:"multipart/form-data; boundary="+boundary};
}
const sample={
 category:"unsure",reason:"unknown",condition:"out_of_service",urgency:"asap",
 name:"Synthetic Tester",email:"tester@example.invalid",phone:"",city:"Ottawa",province:"Ontario",
 preferred_contact:"email",privacy_acknowledged:true,marketing_consent:false
};
const TOKEN="T".repeat(64),SALT="S".repeat(64);
const headers={"x-internal-gateway-token":TOKEN,"x-gateway-origin-verified":"1"};
test("actual PostgreSQL RFQ, private files, idempotency, staff login and review flow",async()=>{
 if(!process.env.TEST_DATABASE_URL)throw Error("TEST_DATABASE_URL required: this suite must use real PostgreSQL");
 const pool=createPool(process.env.TEST_DATABASE_URL);
 const folder=await mkdtemp(join(tmpdir(),"twd-rfq-e2e-"));
 const config:Settings={
  databaseUrl:process.env.TEST_DATABASE_URL,gatewayToken:TOKEN,rateSalt:SALT,uploadRoot:folder,
  uploadQuotaBytes:100_000_000,smtpHost:"",smtpPort:587,smtpUser:"",smtpPassword:"",
  smtpFrom:"",smtpTo:"",port:4387,enableWorker:false
 };
 const app=await createApp(pool,config);
 const post=async(value:Record<string,unknown>,key=randomUUID(),files:{name:string;type:string;bytes:Buffer}[]=[])=>{
  const part=multipart(value,key,files);
  const res=await app.inject({method:"POST",url:"/api/rfq",headers:{...headers,"content-type":part.contentType},payload:part.body});
  return {res,key,json:res.json() as Record<string,unknown>};
 };
 try{
  const name="admin-"+randomUUID()+"@example.invalid";
  const password="synthetic-strong-password-"+randomUUID();
  const hash=await argon2.hash(password,{type:argon2.argon2id});
  await pool.query("INSERT INTO admin_users(email,password_hash,role) VALUES($1,$2,'admin')",[name,hash]);
  const missing=await post({...sample,email:"",phone:""});
  assert.equal(missing.res.statusCode,422);
  const unknown=await post(sample);
  assert.equal(unknown.res.statusCode,201);
  assert.equal(unknown.json.status,"NEEDS_IDENTIFICATION");
  assert.match(String(unknown.json.reference),/^RFQ-[A-Z0-9]{12}$/);
  const repeat=await post(sample,unknown.key);
  assert.equal(repeat.res.statusCode,200);
  assert.equal(repeat.json.duplicate,true);
  assert.equal(repeat.json.reference,unknown.json.reference);
  const conflict=await post({...sample,description:"changed"},unknown.key);
  assert.equal(conflict.res.statusCode,409);
  const lead=await pool.query("SELECT i.id,i.qualification_status,c.contact_name,e.serial_number FROM rfq_inquiries i JOIN rfq_contacts c ON c.rfq_id=i.id JOIN rfq_equipment e ON e.rfq_id=i.id WHERE i.reference=$1",[unknown.json.reference]);
  assert.equal(lead.rowCount,1);assert.equal(lead.rows[0].serial_number,"");
  const waiting=await pool.query("SELECT status FROM rfq_notifications WHERE rfq_id=$1",[lead.rows[0].id]);
  assert.equal(waiting.rows[0].status,"PENDING");
  const exact=await post({...sample,part_number:"SP211C006"});
  assert.equal(exact.json.status,"NEW");
  const held=await post({...sample,part_number:"SP211P304-TWD"});
  assert.equal(held.json.status,"TECHNICAL_HOLD");
  const png=Buffer.from([137,80,78,71,13,10,26,10,0,0,0,0]);
  const invalid=await post(sample,randomUUID(),[{name:"fake.png",type:"image/png",bytes:Buffer.from("untrusted")}]);
  assert.equal(invalid.res.statusCode,422);
  const photo=await post(sample,randomUUID(),[{name:"serial.png",type:"image/png",bytes:png}]);
  assert.equal(photo.res.statusCode,201);assert.equal(photo.json.attachmentFailures,0);
  const file=await pool.query("SELECT id,storage_key FROM rfq_attachments WHERE rfq_id=(SELECT id FROM rfq_inquiries WHERE reference=$1)",[photo.json.reference]);
  assert.equal(file.rowCount,1);
  assert.equal(sniff(await readFile(privatePath(folder,file.rows[0].storage_key))),"image/png");
  assert.throws(()=>privatePath(folder,"../../etc/passwd"),/INVALID_STORAGE_KEY/);
  const unauthorized=await app.inject({method:"GET",url:"/api/admin/rfqs",headers});
  assert.equal(unauthorized.statusCode,401);
  const unauthFile=await app.inject({method:"GET",url:"/api/admin/attachments/"+file.rows[0].id,headers});
  assert.equal(unauthFile.statusCode,401);
  const login=await app.inject({method:"POST",url:"/api/admin/login",headers:{...headers,"content-type":"application/json"},
   payload:JSON.stringify({email:name,password})});
  assert.equal(login.statusCode,200);
  const cookie=String(login.headers["set-cookie"]).split(";")[0];
  const session=await app.inject({method:"GET",url:"/api/admin/session",headers:{...headers,cookie}});
  assert.equal(session.statusCode,200);
  const csrf=(session.json() as {csrf:string}).csrf;
  const adminHeaders={...headers,cookie,"x-csrf-token":csrf};
  const detail=await app.inject({method:"GET",url:"/api/admin/rfqs/"+lead.rows[0].id,headers:adminHeaders});
  assert.equal(detail.statusCode,200);
  const fileResp=await app.inject({method:"GET",url:"/api/admin/attachments/"+file.rows[0].id,headers:adminHeaders});
  assert.equal(fileResp.statusCode,200);
  assert.match(String(fileResp.headers["content-disposition"]),/attachment/);
  const blocked=await app.inject({method:"PATCH",url:"/api/admin/rfqs/"+lead.rows[0].id,
   headers:{...adminHeaders,"content-type":"application/json"},payload:JSON.stringify({action:"status",status:"READY_TO_QUOTE"})});
  assert.equal(blocked.statusCode,422);
  const forged=await app.inject({method:"PATCH",url:"/api/admin/rfqs/"+lead.rows[0].id,
   headers:{...headers,cookie,"content-type":"application/json"},payload:JSON.stringify({action:"note",notes:"No CSRF"})});
  assert.equal(forged.statusCode,403);
  const patch=async(data:Record<string,unknown>)=>app.inject({method:"PATCH",url:"/api/admin/rfqs/"+lead.rows[0].id,
   headers:{...adminHeaders,"content-type":"application/json"},payload:JSON.stringify(data)});
  assert.equal((await patch({action:"note",notes:"Follow up on identification"})).statusCode,200);
  assert.equal((await patch({action:"status",status:"COMPATIBILITY_REVIEW"})).statusCode,200);
  assert.equal((await patch({action:"review",candidate_part:"SP211P304-TWD",relationship_type:"OEM_CROSS_REFERENCE",
   scope:"Exact",publish_rule:"Yes",source_url:"https://example.invalid/evidence",verified:true})).statusCode,422);
  assert.equal((await patch({action:"review",candidate_part:"SP211C006",relationship_type:"OEM_CROSS_REFERENCE",
   scope:"Exact",publish_rule:"Yes",source_url:"https://example.invalid/evidence",verified:true})).statusCode,200);
  assert.equal((await patch({action:"status",status:"READY_TO_QUOTE"})).statusCode,200);
  assert.equal((await patch({action:"quote",reference:"QUOTE-TEST",amount:1000})).statusCode,200);
  const history=await pool.query("SELECT event_type FROM rfq_activities WHERE rfq_id=$1",[lead.rows[0].id]);
  assert.ok(history.rows.some(r=>r.event_type==="REVIEW_RECORDED"));
  const notifications=await app.inject({method:"POST",url:"/api/admin/notifications",headers:adminHeaders});
  assert.equal(notifications.statusCode,503); // SMTP deliberately not configured
  const queue=await pool.query("SELECT status FROM rfq_notifications WHERE rfq_id=$1",[lead.rows[0].id]);
  assert.equal(queue.rows[0].status,"PENDING");
  const logout=await app.inject({method:"POST",url:"/api/admin/logout",headers:adminHeaders});
  assert.equal(logout.statusCode,200);
  const after=await app.inject({method:"GET",url:"/api/admin/rfqs",headers:adminHeaders});
  assert.equal(after.statusCode,401);
 }finally{await app.close();await pool.end();await rm(folder,{recursive:true,force:true});}
});
