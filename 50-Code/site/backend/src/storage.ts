import {randomUUID} from "node:crypto";
import {mkdir,open,readFile,rm,stat} from "node:fs/promises";
import {resolve,join} from "node:path";
import type {DB} from "./database.ts";
const TYPES={"image/jpeg":"jpg","image/png":"png","application/pdf":"pdf"} as const;
export type PrivateFile={bytes:Buffer;name:string;mediaType:keyof typeof TYPES;extension:string};
export function sniff(bytes:Buffer):PrivateFile["mediaType"]|null{
 if(bytes.length>3&&bytes[0]===255&&bytes[1]===216&&bytes[2]===255)return "image/jpeg";
 if(bytes.length>8&&[137,80,78,71,13,10,26,10].every((b,i)=>bytes[i]===b))return "image/png";
 if(bytes.length>8&&bytes.subarray(0,5).toString("ascii")==="%PDF-")return "application/pdf";
 return null;
}
export function validateFiles(raw:{bytes:Buffer;name:string;mediaType:string}[]):PrivateFile[]{
 if(raw.length>3)throw Error("FILES_TOO_MANY");
 return raw.map(item=>{
  if(item.bytes.length<1||item.bytes.length>1_000_000)throw Error("FILE_SIZE");
  const type=sniff(item.bytes);
  if(!type||type!==item.mediaType)throw Error("FILE_TYPE");
  return {bytes:item.bytes,name:item.name.replace(/[^\w .()-]/g,"_").slice(0,100)||"attachment",
   mediaType:type,extension:TYPES[type]};
 });
}
export function privatePath(root:string,key:string){
 if(!/^[a-f0-9-]{36}\/[a-f0-9-]{36}\.(jpg|png|pdf)$/.test(key))throw Error("INVALID_STORAGE_KEY");
 const path=resolve(root,key);
 if(!path.startsWith(resolve(root)+"/"))throw Error("INVALID_STORAGE_KEY");
 return path;
}
export async function putAttachments(pool:DB,root:string,id:string,files:PrivateFile[],quota:number){
 let failures=0;
 for(const file of files){
  const key=id+"/"+randomUUID()+"."+file.extension,path=privatePath(root,key);
  try{
   const current=await pool.query<{total:string}>("SELECT coalesce(sum(size_bytes),0)::text AS total FROM rfq_attachments");
   if(Number(current.rows[0]?.total||0)+file.bytes.length>quota)throw Error("STORAGE_QUOTA");
   await mkdir(join(root,id),{recursive:true,mode:0o700});
   const handle=await open(path,"wx",0o600);
   try{await handle.writeFile(file.bytes);}finally{await handle.close();}
   try{await pool.query("INSERT INTO rfq_attachments(rfq_id,storage_key,original_filename,media_type,size_bytes) VALUES($1,$2,$3,$4,$5)",
    [id,key,file.name,file.mediaType,file.bytes.length]);}
   catch(e){await rm(path,{force:true});throw e;}
  }catch{failures++;}
 }
 if(failures)await pool.query("INSERT INTO rfq_activities(rfq_id,event_type,actor,notes) VALUES($1,'ATTACHMENT_FAILURE','system',$2)",
  [id,failures+" file(s) not stored"]).catch(()=>{});
 return failures;
}
export async function readPrivateFile(root:string,key:string){
 const path=privatePath(root,key);
 if((await stat(path)).size>1_000_000)throw Error("INVALID_FILE_SIZE");
 return readFile(path);
}
