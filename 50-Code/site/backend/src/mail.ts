import nodemailer from "nodemailer";
import type {DB} from "./database.ts";
import {transaction} from "./database.ts";
import type {Settings} from "./config.ts";
export function smtpReady(config:Settings){
 return !!(config.smtpHost&&config.smtpFrom&&config.smtpTo);
}
export async function sendOutbox(pool:DB,config:Settings):Promise<{sent:number;failed:number;configured:boolean}>{
 if(!smtpReady(config))return {sent:0,failed:0,configured:false};
 const transport=nodemailer.createTransport({
  host:config.smtpHost,port:config.smtpPort,secure:config.smtpPort===465,
  ...(config.smtpUser?{auth:{user:config.smtpUser,pass:config.smtpPassword}}:{})
 });
 let sent=0,failed=0;
 for(let i=0;i<10;i++){
  const next=await transaction(pool,async c=>{
   const q=await c.query<{id:string;reference:string;category:string;urgency:string}>(
    "SELECT n.id,i.reference,i.category,i.urgency FROM rfq_notifications n JOIN rfq_inquiries i ON i.id=n.rfq_id WHERE ((n.status IN ('PENDING','FAILED') AND n.next_retry_at<=now()) OR (n.status='SENDING' AND n.locked_at<now()-interval '10 minutes')) AND n.attempts<5 ORDER BY n.created_at FOR UPDATE OF n SKIP LOCKED LIMIT 1");
   const item=q.rows[0];if(!item)return null;
   await c.query("UPDATE rfq_notifications SET status='SENDING',locked_at=now(),attempts=attempts+1 WHERE id=$1",[item.id]);
   return item;
  });
  if(!next)break;
  try{
   await transport.sendMail({from:config.smtpFrom,to:config.smtpTo,
    subject:"Twin Disc RFQ: "+next.reference,
    text:"Inquiry "+next.reference+"; category "+next.category+"; urgency "+next.urgency+
     ". Sign in to the private lead dashboard for contact information."});
   await pool.query("UPDATE rfq_notifications SET status='SENT',sent_at=now(),locked_at=NULL,last_error=NULL WHERE id=$1",[next.id]);
   sent++;
  }catch{
   await pool.query("UPDATE rfq_notifications SET status='FAILED',locked_at=NULL,last_error='SMTP delivery failed',next_retry_at=now()+(interval '1 minute' * least(60,power(2,attempts)::integer)) WHERE id=$1",[next.id]);
   failed++;
  }
 }
 transport.close();
 return {sent,failed,configured:true};
}
