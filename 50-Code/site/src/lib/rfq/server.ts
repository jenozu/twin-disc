/** Backend-only Supabase access. Never import from an Astro client script. */
import { createClient } from "@supabase/supabase-js";
import { createHash, randomUUID } from "node:crypto";
import type { RFQInput } from "./schema.ts";
import { initialStatus } from "./workflow.ts";

export type DB=ReturnType<typeof createClient>;
export function db():DB {
  const url=process.env.SUPABASE_URL;
  const key=process.env.SUPABASE_SERVICE_ROLE_KEY;
  if(!url||!key) throw new Error("BACKEND_NOT_CONFIGURED");
  return createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}});
}
export function digest(s:string):string{return createHash("sha256").update(s).digest("hex");}
export async function submit(dbClient:DB,input:RFQInput,key:string,ip:string,salt:string){
  if(!salt) throw new Error("BACKEND_NOT_CONFIGURED");
  if(!/^[0-9a-f-]{36}$/i.test(key)) throw new Error("INVALID_IDEMPOTENCY");
  const payload={...input,status:initialStatus({part_number:String(input.part_number||""),model_number:String(input.model_number||""),serial_number:String(input.serial_number||""),bom_number:String(input.bom_number||"")})};
  const hash=digest(JSON.stringify(payload));
  const ipHash=digest(salt+":"+ip);
  const {data,error}=await dbClient.rpc("rfq_submit",{
    p_input:payload,p_idempotency:key,p_request_hash:hash,p_visitor_hash:ipHash
  });
  if(error) {
    if(error.message.includes("RFQ_RATE_LIMIT")) throw new Error("RATE_LIMIT");
    if(error.message.includes("RFQ_KEY_CONFLICT")) throw new Error("IDEMPOTENCY_CONFLICT");
    throw new Error("PERSISTENCE_FAILURE");
  }
  return data as {id:string;reference:string;status:string;duplicate:boolean};
}
export const BUCKET="rfq-private";
export const MAX_FILES=3;
export const MAX_FILE_BYTES=1_000_000; // request body remains below Vercel function limits
export async function validateAttachments(items:FormDataEntryValue[]){
  if(items.length>MAX_FILES) throw new Error("FILES_TOO_MANY");
  const files:{bytes:Uint8Array;name:string;type:string;ext:string}[]=[];
  for(const item of items){
    if(!(item instanceof File)) throw new Error("INVALID_FILE");
    if(item.size>MAX_FILE_BYTES||item.size===0) throw new Error("FILE_SIZE");
    const bytes=new Uint8Array(await item.arrayBuffer());
    const jpeg=bytes.length>3&&bytes[0]===255&&bytes[1]===216&&bytes[2]===255;
    const png=bytes.length>8&&[137,80,78,71,13,10,26,10].every((n,i)=>bytes[i]===n);
    const pdf=bytes.length>8&&String.fromCharCode(...bytes.slice(0,5))==="%PDF-";
    if(!jpeg&&!png&&!pdf) throw new Error("FILE_TYPE");
    const type=jpeg?"image/jpeg":png?"image/png":"application/pdf";
    const ext=jpeg?"jpg":png?"png":"pdf";
    const name=item.name.replace(/[^\w .()-]/g,"_").slice(0,100)||"attachment";
    files.push({bytes,name,type,ext});
  }
  return files;
}
export async function storeFiles(client:DB,rfqId:string,files:Awaited<ReturnType<typeof validateAttachments>>){
  const failures:number[]=[];
  for(let i=0;i<files.length;i++){
    const file=files[i], key="rfq/"+rfqId+"/"+randomUUID()+"."+file.ext;
    const {error:uploadError}=await client.storage.from(BUCKET).upload(key,file.bytes,{
      contentType:file.type,upsert:false,cacheControl:"private"
    });
    if(uploadError){failures.push(i+1);continue;}
    const {error:rowError}=await client.from("rfq_attachments").insert({
      rfq_id:rfqId,storage_key:key,original_filename:file.name,media_type:file.type,size_bytes:file.bytes.length
    });
    if(rowError){
      await client.storage.from(BUCKET).remove([key]);
      failures.push(i+1);
    }
  }
  if(failures.length) await client.from("rfq_activities").insert({
    rfq_id:rfqId,event_type:"ATTACHMENT_FAILURE",actor:"system",
    notes:"Files not saved: "+failures.join(",")
  });
  return failures;
}
export function json(data:unknown,status=200):Response{
  return new Response(JSON.stringify(data),{status,headers:{
    "content-type":"application/json; charset=utf-8",
    "cache-control":"no-store",
    "x-content-type-options":"nosniff"
  }});
}
export async function requireAdmin(request:Request,client:DB){
  const allowed=(process.env.RFQ_ADMIN_USER_IDS||"").split(",").map(s=>s.trim()).filter(Boolean);
  if(!allowed.length) throw new Error("ADMIN_DISABLED");
  const bearer=request.headers.get("authorization")||"";
  if(!bearer.startsWith("Bearer ")) throw new Error("UNAUTHORIZED");
  const {data,error}=await client.auth.getUser(bearer.slice(7));
  if(error||!data.user||!allowed.includes(data.user.id)) throw new Error("UNAUTHORIZED");
  return data.user.id;
}
export function adminError(error:unknown){
  return json({error:error instanceof Error && error.message==="ADMIN_DISABLED"?"ADMIN_DISABLED":"UNAUTHORIZED"},
    error instanceof Error && error.message==="ADMIN_DISABLED"?503:401);
}
