import type { APIRoute } from "astro";
import { db,requireAdmin,adminError,json } from "../../../lib/rfq/server";
export const prerender=false;
export const GET:APIRoute=async({request})=>{
  let client;
  try{client=db();await requireAdmin(request,client);}catch(e){return adminError(e);}
  const {data,error}=await client.from("rfq_notifications")
    .select("id,rfq_id,kind,status,attempts,created_at")
    .order("created_at",{ascending:false}).limit(100);
  if(error)return json({error:"QUEUE_UNAVAILABLE"},503);
  return json({notifications:data,deliveryConfigured:!!(process.env.RESEND_API_KEY&&process.env.RFQ_NOTIFICATION_TO&&process.env.RFQ_NOTIFICATION_FROM)});
};
export const POST:APIRoute=async({request})=>{
  let client;
  try{client=db();await requireAdmin(request,client);}catch(e){return adminError(e);}
  const apiKey=process.env.RESEND_API_KEY;
  const to=process.env.RFQ_NOTIFICATION_TO,from=process.env.RFQ_NOTIFICATION_FROM;
  if(!apiKey||!to||!from)return json({error:"DELIVERY_NOT_CONFIGURED"},503);
  // Operator-triggered retry; persisted outbox remains the source of truth.
  const {data:pending,error}=await client.from("rfq_notifications")
    .select("id,rfq_id,kind,attempts,rfq_inquiries(reference,category,urgency)")
    .in("status",["PENDING","FAILED"]).lt("attempts",5)
    .order("created_at",{ascending:true}).limit(10);
  if(error)return json({error:"QUEUE_UNAVAILABLE"},503);
  let sent=0,failed=0;
  for(const n of (pending||[]) as any[]){
    const {data:lock}=await client.from("rfq_notifications")
      .update({status:"SENDING",attempts:n.attempts+1}).eq("id",n.id)
      .in("status",["PENDING","FAILED"]).select("id").maybeSingle();
    if(!lock)continue;
    const lead=Array.isArray(n.rfq_inquiries)?n.rfq_inquiries[0]:n.rfq_inquiries;
    try{
      const response=await fetch("https://api.resend.com/emails",{
        method:"POST",headers:{"authorization":"Bearer "+apiKey,"content-type":"application/json",
          "Idempotency-Key":n.id},
        body:JSON.stringify({from,to:[to],subject:"RFQ notification: "+String(lead?.reference||"inquiry"),
          text:"New inquiry "+String(lead?.reference||"")+"; category "+String(lead?.category||"")+
          "; urgency "+String(lead?.urgency||"")+". Sign in to the protected lead dashboard to review."})
      });
      if(!response.ok)throw new Error("EMAIL_PROVIDER_REJECTED");
      await client.from("rfq_notifications").update({status:"SENT",sent_at:new Date().toISOString(),last_error:null}).eq("id",n.id);
      sent++;
    }catch{
      await client.from("rfq_notifications").update({status:"FAILED",last_error:"Delivery unsuccessful; retry pending."}).eq("id",n.id);
      failed++;
    }
  }
  return json({processed:sent+failed,sent,failed});
};
