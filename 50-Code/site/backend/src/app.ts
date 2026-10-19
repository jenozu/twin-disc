import Fastify from "fastify";
import multipart from "@fastify/multipart";
import type {DB} from "./database.ts";
import type {Settings} from "./config.ts";
import {installGatewayGuard} from "./guard.ts";
import {registerAuth} from "./auth.ts";
import {registerAdmin} from "./admin.ts";
import {validateRFQ} from "../../src/lib/rfq/schema.ts";
import {saveInquiry,IntakeError} from "./intake.ts";
import {putAttachments,validateFiles} from "./storage.ts";
import type {PrivateFile} from "./storage.ts";
export async function createApp(pool:DB,config:Settings){
 const app=Fastify({logger:false,bodyLimit:3_500_000,trustProxy:false});
 installGatewayGuard(app,config.gatewayToken);
 await app.register(multipart,{limits:{files:3,fields:2,parts:5,fieldSize:22000,fileSize:1_000_000},throwFileSizeLimit:true});
 app.get("/healthz",async()=>({ok:true})); // no database or customer information
 app.get("/readyz",async(_req,reply)=>{
  try{await pool.query("SELECT 1");return {ready:true};}
  catch{return reply.code(503).send({ready:false});}
 });
 app.post("/api/rfq",async(req,reply)=>{
  if(!String(req.headers["content-type"]||"").startsWith("multipart/form-data"))
   return reply.code(415).send({error:"EXPECTED_MULTIPART"});
  let raw="",key="";
  const incoming:{bytes:Buffer;name:string;mediaType:string}[]=[];
  try{
   for await(const part of req.parts()){
    if(part.type==="file"){
     if(part.fieldname!=="attachments")return reply.code(422).send({error:"INVALID_FILE_FIELD"});
     incoming.push({bytes:await part.toBuffer(),name:part.filename,mediaType:part.mimetype});
    }else if(part.fieldname==="payload")raw=String(part.value||"");
    else if(part.fieldname==="idempotency_key")key=String(part.value||"");
    else return reply.code(422).send({error:"INVALID_FIELD"});
   }
  }catch{return reply.code(413).send({error:"UPLOAD_LIMIT_EXCEEDED"});}
  if(raw.length>22000)return reply.code(413).send({error:"REQUEST_TOO_LARGE"});
  let input:unknown;try{input=JSON.parse(raw);}catch{return reply.code(400).send({error:"INVALID_JSON"});}
  const checked=validateRFQ(input);
  if(!checked.ok)return reply.code(422).send({error:"VALIDATION",fields:checked.errors});
  let files:PrivateFile[];
  try{files=validateFiles(incoming);}catch(error){return reply.code(422).send({error:error instanceof Error?error.message:"INVALID_FILE"});}
  // Identity supplied by the authenticated same-origin gateway, never arbitrary public proxy headers.
  const identity=String(req.headers["x-gateway-rate-identity"]||"anonymous").slice(0,150);
  try{
   const saved=await saveInquiry(pool,checked.value,key,identity,config.rateSalt);
   let failed=0;
   if(!saved.duplicate&&files.length){
    try{failed=await putAttachments(pool,config.uploadRoot,saved.id,files,config.uploadQuotaBytes);}
    catch{failed=files.length;}
   }
   return reply.code(saved.duplicate?200:201).send({
    accepted:true,reference:saved.reference,status:saved.status,duplicate:saved.duplicate,attachmentFailures:failed
   });
  }catch(error){
   if(error instanceof IntakeError){
    const status=error.code==="TOO_MANY_REQUESTS"?429:error.code==="IDEMPOTENCY_CONFLICT"?409:422;
    return reply.code(status).send({error:error.code});
   }
   return reply.code(503).send({error:"SUBMISSION_UNAVAILABLE"});
  }
 });
 await registerAuth(app,pool,config.rateSalt);
 registerAdmin(app,pool,config);
 app.setErrorHandler((error,_req,reply)=>{
  const status=error.statusCode&&error.statusCode>=400&&error.statusCode<500?error.statusCode:503;
  reply.code(status).send({error:status===503?"SERVICE_UNAVAILABLE":"INVALID_REQUEST"});
 });
 return app;
}
