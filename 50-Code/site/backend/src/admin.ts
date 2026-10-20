import type {FastifyInstance} from "fastify";
import {isHeldPart,canTransition,canVerifyCandidate,STATUSES} from "../../src/lib/rfq/workflow.ts";
import type {Status,ReviewEvidence,PublishRule} from "../../src/lib/rfq/workflow.ts";
import type {DB} from "./database.ts";
import {transaction} from "./database.ts";
import {needStaff} from "./auth.ts";
import {readPrivateFile} from "./storage.ts";
import {sendOutbox} from "./mail.ts";
import type {Settings} from "./config.ts";
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
type Action={action:string;status?:string;reason?:string;notes?:string;date?:string;
 candidate_part?:string;relationship_type?:string;scope?:string;publish_rule?:string;
 source_url?:string;verified?:boolean;reference?:string;amount?:string|number};
const fields=["status","urgency","category","city","source","from","to"];
export function registerAdmin(app:FastifyInstance,pool:DB,config:Settings){
 app.get("/api/admin/rfqs",async(req,reply)=>{
  if(!await needStaff(req,reply,pool))return;
  const params=new URLSearchParams((req.url.split("?")[1]||""));
  const clauses:string[]=[],args:unknown[]=[];
  for(const k of fields){
   const value=params.get(k)?.slice(0,120);if(!value)continue;
   if(k==="from"||k==="to"){
    if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return reply.code(422).send({error:"INVALID_FILTER"});
    args.push(value);clauses.push("i.created_at "+(k==="from"?">=":"<")+" $"+args.length+"::date"+(k==="to"?" + interval '1 day'":""));
   }else if(k==="status"||k==="urgency"||k==="category"){
    const column=k==="status"?"qualification_status":k;
    args.push(value);clauses.push("i."+column+"=$"+args.length);
   }else if(k==="city"){
    args.push("%"+value+"%");clauses.push("c.city ILIKE $"+args.length);
   }else if(k==="source"){
    args.push("%"+value+"%");clauses.push("i.attribution->>'source' ILIKE $"+args.length);
   }
  }
  const sql="SELECT i.id,i.reference,i.created_at,i.qualification_status,i.technical_review_status,i.category,i.urgency,i.part_number,i.model_number,i.attribution,i.follow_up_at,json_build_object('contact_name',c.contact_name,'company',c.company,'city',c.city,'province',c.province) AS rfq_contacts FROM rfq_inquiries i JOIN rfq_contacts c ON c.rfq_id=i.id"
    +(clauses.length?" WHERE "+clauses.join(" AND "):"")+" ORDER BY i.created_at DESC LIMIT 100";
  const r=await pool.query(sql,args);
  const counts:Record<string,number>={total:r.rows.length};
  for(const row of r.rows)counts[row.qualification_status]=(counts[row.qualification_status]||0)+1;
  return reply.send({items:r.rows,counts,limit:100});
 });
 app.get<{Params:{id:string}}>("/api/admin/rfqs/:id",async(req,reply)=>{
  if(!await needStaff(req,reply,pool))return;
  const {id}=req.params;if(!uuid.test(id))return reply.code(422).send({error:"INVALID_ID"});
  const q=await pool.query("SELECT * FROM rfq_inquiries WHERE id=$1",[id]);
  if(!q.rowCount)return reply.code(404).send({error:"NOT_FOUND"});
  const result=q.rows[0] as Record<string,unknown>;
  for(const table of ["rfq_contacts","rfq_equipment","rfq_attachments","rfq_activities","rfq_compatibility_reviews"]){
   const cols=table==="rfq_activities"?"created_at ASC":"created_at DESC";
   const suffix=["rfq_contacts","rfq_equipment"].includes(table)?"":" ORDER BY "+cols;
   const data=await pool.query("SELECT * FROM "+table+" WHERE rfq_id=$1"+suffix,[id]);
   result[table]=["rfq_contacts","rfq_equipment"].includes(table)?data.rows[0]||null:data.rows;
  }
  return reply.send({lead:result});
 });
 app.patch<{Params:{id:string};Body:Action}>("/api/admin/rfqs/:id",async(req,reply)=>{
  const staff=await needStaff(req,reply,pool,true);if(!staff)return;
  const {id}=req.params;if(!uuid.test(id))return reply.code(422).send({error:"INVALID_ID"});
  const data=req.body;
  if(!data||typeof data!=="object"||JSON.stringify(data).length>6000)return reply.code(422).send({error:"INVALID_ACTION"});
  try{
   const result=await transaction(pool,async c=>{
    const rows=await c.query<{qualification_status:Status}>("SELECT qualification_status FROM rfq_inquiries WHERE id=$1 FOR UPDATE",[id]);
    const current=rows.rows[0]?.qualification_status;
    if(!current)throw Error("NOT_FOUND");
    const activity=async(kind:string,note:string="",before:string|null=null,after:string|null=null)=>{
     await c.query("INSERT INTO rfq_activities(rfq_id,event_type,actor,previous_status,new_status,notes) VALUES($1,$2,$3,$4,$5,$6)",
      [id,kind,staff.id,before,after,note.slice(0,2000)]);
    };
    if(data.action==="note"){
     if(typeof data.notes!=="string"||data.notes.trim().length<1||data.notes.length>2000)throw Error("INVALID_NOTE");
     await activity("INTERNAL_NOTE",data.notes.trim());
    }else if(data.action==="followup"){
     if(typeof data.date!=="string"||!/^\d{4}-\d{2}-\d{2}$/.test(data.date)||Number.isNaN(Date.parse(data.date)))throw Error("INVALID_DATE");
     await c.query("UPDATE rfq_inquiries SET follow_up_at=$1::date,updated_at=now() WHERE id=$2",[data.date,id]);
     await activity("FOLLOWUP_SCHEDULED",data.date);
    }else if(data.action==="review"){
     const candidate=typeof data.candidate_part==="string"?data.candidate_part.trim().toUpperCase():"";
     const relation=typeof data.relationship_type==="string"?data.relationship_type.trim():"";
     const scope=typeof data.scope==="string"?data.scope:"Unverified";
     const rule=data.publish_rule as PublishRule;
     const source=typeof data.source_url==="string"?data.source_url.trim():"";
     const notes=typeof data.notes==="string"?data.notes:"";
     if(candidate.length<2||candidate.length>100||relation.length<2||relation.length>100||
       notes.length>2000||source.length>300||!["Yes","Family-only","Review","Hold","No"].includes(rule))
       throw Error("INVALID_REVIEW");
     const verified=data.verified===true;
     const forbidden=["SERVICE_REPLACED_BY","SUPERSEDED_BY","POSSIBLE_COMPATIBILITY"];
     if(verified&&(staff.role!=="admin"||forbidden.includes(relation)||
       !canVerifyCandidate(candidate,rule,scope,source)))throw Error("REVIEW_EVIDENCE_REQUIRED");
     if(isHeldPart(candidate)&&verified)throw Error("HELD");
     await c.query("INSERT INTO rfq_compatibility_reviews(rfq_id,candidate_part,relationship_type,scope,publish_rule,source_url,verification_status,reviewer_id,reviewed_at,notes) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)",
      [id,candidate,relation,scope.slice(0,50),rule,source,verified?"VERIFIED":"PENDING",
       verified?staff.id:null,verified?new Date():null,notes]);
     await activity("REVIEW_RECORDED","Candidate "+candidate+" / "+(verified?"VERIFIED":"PENDING"));
    }else if(data.action==="status"){
     const target=data.status as Status;
     if(!STATUSES.includes(target))throw Error("INVALID_STATUS");
     const reviews=await c.query<{candidate_part:string;publish_rule:PublishRule;scope:string;source_url:string;reviewer_id:string;reviewed_at:Date;verification_status:string;relationship_type:string}>(
      "SELECT candidate_part,publish_rule,scope,source_url,reviewer_id,reviewed_at,verification_status,relationship_type FROM rfq_compatibility_reviews WHERE rfq_id=$1",[id]);
     const evidence:ReviewEvidence[]=reviews.rows.filter(r=>!["SERVICE_REPLACED_BY","SUPERSEDED_BY","POSSIBLE_COMPATIBILITY"].includes(r.relationship_type)).map(r=>({
      candidate_part:r.candidate_part,publish_rule:r.publish_rule,scope:r.scope,source_url:r.source_url,
      reviewer_id:r.reviewer_id,reviewed_at:r.reviewed_at?.toISOString()||"",verified:r.verification_status==="VERIFIED"
     }));
     if(!canTransition(current,target,evidence)||(target==="READY_TO_QUOTE"&&staff.role!=="admin"))throw Error("INVALID_TRANSITION");
     if(target==="LOST"&&(typeof data.reason!=="string"||data.reason.trim().length<3))throw Error("LOST_REASON_REQUIRED");
     const reason=typeof data.reason==="string"?data.reason.slice(0,1000):"";
     await c.query("UPDATE rfq_inquiries SET qualification_status=$1,updated_at=now(),lost_reason=CASE WHEN $1='LOST' THEN $2 ELSE lost_reason END WHERE id=$3",[target,reason,id]);
     await activity("STATUS_CHANGED",reason,current,target);
    }else if(data.action==="quote"){
     if(current!=="READY_TO_QUOTE"||typeof data.reference!=="string"||data.reference.length<1||data.reference.length>100)throw Error("QUOTE_NOT_READY");
     const amount=Number(data.amount);
     if(!Number.isFinite(amount)||amount<0||amount>100000000)throw Error("INVALID_AMOUNT");
     await c.query("UPDATE rfq_inquiries SET quote_reference=$1,quoted_amount=$2,updated_at=now() WHERE id=$3",[data.reference,amount,id]);
     await activity("QUOTE_RECORDED","Quote reference: "+data.reference);
    }else throw Error("UNKNOWN_ACTION");
    return {id,action:data.action};
   });
   return reply.send({updated:true,lead:result});
  }catch(error){return reply.code(422).send({error:error instanceof Error?error.message:"ACTION_REJECTED"});}
 });
 app.get<{Params:{id:string}}>("/api/admin/attachments/:id",async(req,reply)=>{
  if(!await needStaff(req,reply,pool))return;
  if(!uuid.test(req.params.id))return reply.code(422).send({error:"INVALID_ID"});
  const r=await pool.query<{storage_key:string;media_type:string;original_filename:string}>(
   "SELECT storage_key,media_type,original_filename FROM rfq_attachments WHERE id=$1",[req.params.id]);
  if(!r.rowCount)return reply.code(404).send({error:"NOT_FOUND"});
  try{
   const bytes=await readPrivateFile(config.uploadRoot,r.rows[0].storage_key);
   return reply.header("content-type","application/octet-stream")
    .header("content-disposition","attachment; filename=\"rfq-attachment\"")
    .header("cache-control","private, no-store").header("x-content-type-options","nosniff")
    .header("content-security-policy","default-src 'none'").send(bytes);
  }catch{return reply.code(404).send({error:"ATTACHMENT_UNAVAILABLE"});}
 });
 app.get("/api/admin/notifications",async(req,reply)=>{
  if(!await needStaff(req,reply,pool))return;
  const r=await pool.query("SELECT id,rfq_id,kind,status,attempts,next_retry_at,last_error,created_at,sent_at FROM rfq_notifications ORDER BY created_at DESC LIMIT 100");
  return reply.send({notifications:r.rows});
 });
 app.post("/api/admin/notifications",async(req,reply)=>{
  const staff=await needStaff(req,reply,pool,true);if(!staff)return;
  if(staff.role!=="admin")return reply.code(403).send({error:"ADMIN_ONLY"});
  const result=await sendOutbox(pool,config);
  return result.configured?reply.send(result):reply.code(503).send({error:"SMTP_NOT_CONFIGURED",...result});
 });
}
