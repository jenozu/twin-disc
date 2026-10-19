import {createHash,randomUUID} from "node:crypto";
import type {DB} from "./database.ts";
import {transaction,one} from "./database.ts";
import type {RFQInput} from "../../../src/lib/rfq/schema.ts";
import {initialStatus,isHeldPart} from "../../../src/lib/rfq/workflow.ts";
const digest=(s:string)=>createHash("sha256").update(s).digest("hex");
const idempotency=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
type Saved={id:string;reference:string;status:string;duplicate:boolean};
export class IntakeError extends Error{constructor(public code:string){super(code);}}
export async function saveInquiry(pool:DB,input:RFQInput,key:string,identity:string,salt:string):Promise<Saved>{
 if(!idempotency.test(key))throw new IntakeError("INVALID_IDEMPOTENCY");
 const payloadHash=digest(JSON.stringify(input));
 const visitorHash=digest(salt+":"+identity);
 return transaction(pool,async c=>{
  await c.query("SELECT pg_advisory_xact_lock(hashtext($1))",[key]);
  const existing=await one<{id:string;reference:string;qualification_status:string;request_hash:string}>(c,
   "SELECT id,reference,qualification_status,request_hash FROM rfq_inquiries WHERE idempotency_key=$1",[key]);
  if(existing){
   if(existing.request_hash!==payloadHash)throw new IntakeError("IDEMPOTENCY_CONFLICT");
   return {id:existing.id,reference:existing.reference,status:existing.qualification_status,duplicate:true};
  }
  await c.query("SELECT pg_advisory_xact_lock(hashtext($1))",[visitorHash]);
  const hit=await one<{count:string}>(c,
   "SELECT count(*)::text AS count FROM rfq_inquiries WHERE visitor_hash=$1 AND created_at>now()-interval '1 hour'",[visitorHash]);
  if(Number(hit?.count)>5)throw new IntakeError("TOO_MANY_REQUESTS");
  const initial=initialStatus({part_number:String(input.part_number||""),model_number:String(input.model_number||""),
   serial_number:String(input.serial_number||""),bom_number:String(input.bom_number||"")});
  const status=isHeldPart(String(input.part_number||""))?"TECHNICAL_HOLD":initial;
  const reference="RFQ-"+randomUUID().replaceAll("-","").slice(0,12).toUpperCase();
  const r=await one<{id:string}>(c,
   "INSERT INTO rfq_inquiries(reference,idempotency_key,request_hash,visitor_hash,category,reason,equipment_condition,urgency,description,part_number,model_number,qualification_status,attribution) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING id",
   [reference,key,payloadHash,visitorHash,input.category,input.reason,input.condition,input.urgency,
    input.description,input.part_number,input.model_number,status,JSON.stringify({
     landing_page:input.landing_page,source:input.source,medium:input.medium,campaign:input.campaign,referrer:input.referrer})]);
  if(!r)throw new IntakeError("PERSISTENCE_FAILURE");
  await c.query(
   "INSERT INTO rfq_contacts(rfq_id,contact_name,company,email,phone,city,province,postal_code,preferred_contact,comments,privacy_acknowledged_at,marketing_consent,marketing_consent_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,now(),$11,CASE WHEN $11 THEN now() ELSE NULL END)",
   [r.id,input.name,input.company,input.email,input.phone,input.city,input.province,input.postal_code,
    input.preferred_contact,input.comments,input.marketing_consent]);
  await c.query(
   "INSERT INTO rfq_equipment(rfq_id,equipment_manufacturer,equipment_model,equipment_type,engine,horsepower,rpm,drive_arrangement,model_number,serial_number,bom_number,oem_part_number,technical_notes) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)",
   [r.id,input.equipment_manufacturer,input.equipment_model,input.equipment_type,input.engine,input.horsepower,
    input.rpm,input.drive_arrangement,input.model_number,input.serial_number,input.bom_number,input.oem_part_number,input.technical_notes]);
  await c.query("INSERT INTO rfq_activities(rfq_id,event_type,actor,new_status,notes) VALUES($1,'CREATED','system',$2,'Submission stored')",[r.id,status]);
  const kind=input.condition==="out_of_service"?"URGENT_RFQ":status==="NEEDS_IDENTIFICATION"?"IDENTIFICATION_RFQ":"NEW_RFQ";
  await c.query("INSERT INTO rfq_notifications(rfq_id,kind) VALUES($1,$2)",[r.id,kind]);
  return {id:r.id,reference,status,duplicate:false};
 });
}
