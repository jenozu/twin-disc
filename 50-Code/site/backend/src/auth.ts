import type {FastifyInstance,FastifyRequest} from "fastify";
import cookie from "@fastify/cookie";
import argon2 from "argon2";
import {createHash,randomBytes,timingSafeEqual} from "node:crypto";
import type {DB} from "./database.ts";
const NAME="__Host-twd_rfq_session";
const hash=(s:string)=>createHash("sha256").update(s).digest("hex");
const token=()=>randomBytes(32).toString("hex");
const opts={httpOnly:true,secure:true,sameSite:"lax" as const,path:"/" as const,maxAge:8*3600};
export type Staff={id:string;email:string;role:"staff"|"admin";sessionId:string;csrfHash:string|null};
export function sameHash(value:string,expected:string){
 const a=Buffer.from(hash(value)),b=Buffer.from(expected);
 return a.length===b.length&&timingSafeEqual(a,b);
}
export async function authenticate(request:FastifyRequest,pool:DB):Promise<Staff|null>{
 const raw=request.cookies?.[NAME];
 if(!raw||!/^[a-f0-9]{64}$/.test(raw))return null;
 const result=await pool.query<Staff>(
  "SELECT u.id,u.email,u.role,s.id AS \"sessionId\",s.csrf_hash AS \"csrfHash\" FROM admin_sessions s JOIN admin_users u ON u.id=s.user_id WHERE s.token_hash=$1 AND s.revoked_at IS NULL AND s.expires_at>now() AND u.active=true",
  [hash(raw)]);
 return result.rows[0]||null;
}
export async function needStaff(request:FastifyRequest,reply:{code:(code:number)=>{send:(body:unknown)=>unknown}},pool:DB,mutation=false){
 const user=await authenticate(request,pool);
 if(!user){reply.code(401).send({error:"UNAUTHORIZED"});return null;}
 if(mutation && (!request.headers["x-csrf-token"]||!user.csrfHash||
   !sameHash(String(request.headers["x-csrf-token"]),user.csrfHash))){
  reply.code(403).send({error:"CSRF_REJECTED"});return null;
 }
 return user;
}
export async function registerAuth(app:FastifyInstance,pool:DB,rateSalt:string){
 await app.register(cookie);
 app.post("/api/admin/login",async(req,reply)=>{
  const body=req.body as Record<string,unknown>|null;
  const email=typeof body?.email==="string"?body.email.trim().toLowerCase():"";
  const password=typeof body?.password==="string"?body.password:"";
  if(email.length>254||!email.includes("@")||password.length<1||password.length>512)return reply.code(401).send({error:"INVALID_CREDENTIALS"});
  const identity=hash(rateSalt+":"+email);
  const attempts=await pool.query<{count:string}>(
   "SELECT count(*)::text AS count FROM admin_login_attempts WHERE identity_hash=$1 AND successful=false AND created_at>now()-interval '15 minutes'",[identity]);
  if(Number(attempts.rows[0]?.count||0)>=5)return reply.code(429).send({error:"LOGIN_RATE_LIMIT"});
  const found=await pool.query<{id:string;password_hash:string;active:boolean;role:string}>(
   "SELECT id,password_hash,active,role FROM admin_users WHERE email=$1",[email]);
  const user=found.rows[0];
  const verified=!!user&&user.active&&await argon2.verify(user.password_hash,password).catch(()=>false);
  await pool.query("INSERT INTO admin_login_attempts(identity_hash,successful) VALUES($1,$2)",[identity,verified]);
  if(!verified)return reply.code(401).send({error:"INVALID_CREDENTIALS"});
  const sessionToken=token(),csrf=token();
  await pool.query("INSERT INTO admin_sessions(user_id,token_hash,csrf_hash,expires_at) VALUES($1,$2,$3,now()+interval '8 hours')",
   [user.id,hash(sessionToken),hash(csrf)]);
  await pool.query("UPDATE admin_users SET last_login_at=now() WHERE id=$1",[user.id]);
  reply.setCookie(NAME,sessionToken,opts);
  return reply.send({authenticated:true,csrf});
 });
 app.get("/api/admin/session",async(req,reply)=>{
  const user=await needStaff(req,reply,pool);if(!user)return;
  const csrf=token();
  await pool.query("UPDATE admin_sessions SET csrf_hash=$1 WHERE id=$2",[hash(csrf),user.sessionId]);
  return reply.send({authenticated:true,csrf,role:user.role,email:user.email});
 });
 app.post("/api/admin/logout",async(req,reply)=>{
  const user=await needStaff(req,reply,pool,true);if(!user)return;
  await pool.query("UPDATE admin_sessions SET revoked_at=now() WHERE id=$1",[user.sessionId]);
  reply.clearCookie(NAME,{path:"/"});
  return reply.send({signedOut:true});
 });
}
