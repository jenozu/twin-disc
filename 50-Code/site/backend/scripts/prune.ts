/** Destructive maintenance is opt-in and is never scheduled by default. */
import {readdir,lstat,rm} from "node:fs/promises";
import {join,resolve} from "node:path";
import {createPool} from "../src/database.ts";
const url=process.env.DATABASE_URL_MIGRATE;
const root=process.env.UPLOAD_ROOT;
const days=Number(process.env.RETENTION_DAYS);
const approved=process.env.CONFIRM_DELETE==="YES";
if(!url||!root||!root.startsWith("/")||root.includes("..")||!Number.isInteger(days)||days<30)
 throw Error("Require owner database URL, safe absolute upload root, RETENTION_DAYS >=30");
const pool=createPool(url);
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
try{
 const expired=await pool.query<{id:string}>(
  "SELECT id FROM rfq_inquiries WHERE qualification_status IN ('CLOSED','WON','LOST') AND created_at<now()-($1::integer * interval '1 day') ORDER BY created_at LIMIT 100",[days]);
 console.info("Expired closed inquiries:",expired.rowCount,"(dry-run:",!approved,")");
 if(approved){
  for(const row of expired.rows){
   // Remove DB record first (FK cascade). An orphan sweeper cleans files after failure.
   const removed=await pool.query("DELETE FROM rfq_inquiries WHERE id=$1 RETURNING id",[row.id]);
   if(removed.rowCount)await rm(join(root,row.id),{recursive:true,force:true});
  }
  for(const name of await readdir(root)){
   if(!uuid.test(name))continue;
   const path=resolve(root,name);
   if(!path.startsWith(resolve(root)+"/")||!(await lstat(path)).isDirectory())continue;
   const exists=await pool.query("SELECT 1 FROM rfq_inquiries WHERE id=$1",[name]);
   if(!exists.rowCount)await rm(path,{recursive:true,force:true});
  }
  console.info("Purge finished; verify logs and backups.");
 }
}finally{await pool.end();}
