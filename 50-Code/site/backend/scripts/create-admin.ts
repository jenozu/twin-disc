import {readFile,stat} from "node:fs/promises";
import argon2 from "argon2";
import {createPool} from "../src/database.ts";
const email=(process.env.ADMIN_EMAIL||"").trim().toLowerCase();
const file=process.env.ADMIN_PASSWORD_FILE||"";
const url=process.env.DATABASE_URL_MIGRATE||"";
if(!email.includes("@")||!file.startsWith("/")||!url)throw Error("Set ADMIN_EMAIL, ADMIN_PASSWORD_FILE (absolute private file), DATABASE_URL_MIGRATE");
const info=await stat(file);
if((info.mode&0o077)!==0)throw Error("Password file must have mode 0600");
const password=(await readFile(file,"utf8")).trimEnd();
if(password.length<16||password.length>512)throw Error("Password must contain 16-512 characters");
const digest=await argon2.hash(password,{type:argon2.argon2id,memoryCost:65536,timeCost:3,parallelism:1});
const pool=createPool(url);
try{
 const exists=await pool.query("SELECT id FROM admin_users WHERE email=$1",[email]);
 if(exists.rowCount)throw Error("Account already exists; do not overwrite credentials automatically");
 await pool.query("INSERT INTO admin_users(email,password_hash,role) VALUES($1,$2,'admin')",[email,digest]);
 console.info("Administrator created:",email);
}finally{await pool.end();}
