import {readFile,readdir} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import {dirname,resolve} from "node:path";
import {createPool} from "../src/database.ts";
const url=process.env.DATABASE_URL_MIGRATE;
if(!url)throw Error("DATABASE_URL_MIGRATE is required; use database owner (not runtime role)");
const pool=createPool(url);
const root=resolve(dirname(fileURLToPath(import.meta.url)),"../migrations");
try{
 const files=(await readdir(root)).filter(s=>/^\d+_[\w-]+\.sql$/.test(s)).sort();
 for(const name of files){
  const c=await pool.connect();
  try{
   await c.query("BEGIN");
   await c.query("SELECT pg_advisory_xact_lock(2100438)");
   await c.query("CREATE TABLE IF NOT EXISTS schema_migrations(version text PRIMARY KEY,applied_at timestamptz NOT NULL DEFAULT now())");
   const done=await c.query("SELECT 1 FROM schema_migrations WHERE version=$1",[name]);
   if(!done.rowCount){
    await c.query(await readFile(resolve(root,name),"utf8"));
    await c.query("INSERT INTO schema_migrations(version) VALUES($1)",[name]);
    console.info("Applied migration",name);
   }
   await c.query("COMMIT");
  }catch(e){await c.query("ROLLBACK");throw e;}
  finally{c.release();}
 }
 // Privileges are granted AFTER table creation; app role has DML only.
 const role=await pool.query("SELECT 1 FROM pg_roles WHERE rolname='rfq_app'");
 if(role.rowCount){
  await pool.query("GRANT USAGE ON SCHEMA public TO rfq_app");
  await pool.query("GRANT SELECT,INSERT,UPDATE,DELETE ON ALL TABLES IN SCHEMA public TO rfq_app");
  await pool.query("GRANT USAGE,SELECT ON ALL SEQUENCES IN SCHEMA public TO rfq_app");
 }
 console.info("Migrations complete");
}finally{await pool.end();}
