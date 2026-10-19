import type { APIRoute } from "astro";
import { db,requireAdmin,adminError,json } from "../../../../lib/rfq/server";
export const prerender=false;
export const GET:APIRoute=async({request})=>{
  let client,actor;
  try{client=db(); actor=await requireAdmin(request,client);}
  catch(e){return adminError(e);}
  const url=new URL(request.url);
  const status=url.searchParams.get("status");
  const urgency=url.searchParams.get("urgency");
  const category=url.searchParams.get("category");
  const after=url.searchParams.get("from");
  const before=url.searchParams.get("to");
  let q=client.from("rfq_inquiries").select(
    "id,reference,created_at,qualification_status,technical_review_status,category,urgency,part_number,model_number,attribution,follow_up_at,rfq_contacts(contact_name,company,city,province)"
  ).order("created_at",{ascending:false}).limit(100);
  if(status) q=q.eq("qualification_status",status);
  if(urgency) q=q.eq("urgency",urgency);
  if(category) q=q.eq("category",category);
  if(after && /^\d{4}-\d{2}-\d{2}$/.test(after)) q=q.gte("created_at",after);
  if(before && /^\d{4}-\d{2}-\d{2}$/.test(before)) q=q.lte("created_at",before+"T23:59:59Z");
  const {data,error}=await q;
  if(error)return json({error:"LEAD_LIST_UNAVAILABLE"},503);
  const city=(url.searchParams.get("city")||"").toLowerCase();
  const source=(url.searchParams.get("source")||"").toLowerCase();
  const items=(data||[]).filter((r:any)=>{
    const contact=Array.isArray(r.rfq_contacts)?r.rfq_contacts[0]:r.rfq_contacts;
    return (!city || String(contact?.city||"").toLowerCase().includes(city)) &&
      (!source || String(r.attribution?.source||"").toLowerCase().includes(source));
  });
  const counts:Record<string,number>={total:items.length};
  for(const item of items)counts[item.qualification_status]=(counts[item.qualification_status]||0)+1;
  return json({items,counts,limit:100});
};
