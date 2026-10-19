import type { APIRoute } from "astro";
import { db,requireAdmin,adminError,json } from "../../../../lib/rfq/server";
export const prerender=false;
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export const GET:APIRoute=async({request,params})=>{
  let client;
  try{client=db();await requireAdmin(request,client);}catch(e){return adminError(e);}
  if(!uuid.test(params.id||""))return json({error:"INVALID_ID"},400);
  const {data,error}=await client.from("rfq_inquiries").select(
    "*,rfq_contacts(*),rfq_equipment(*),rfq_attachments(*),rfq_activities(*),rfq_compatibility_reviews(*)"
  ).eq("id",params.id!).single();
  return error?json({error:"LEAD_NOT_FOUND"},404):json({lead:data});
};
export const PATCH:APIRoute=async({request,params})=>{
  let client,actor;
  try{client=db();actor=await requireAdmin(request,client);}catch(e){return adminError(e);}
  if(!uuid.test(params.id||""))return json({error:"INVALID_ID"},400);
  let body:any;
  try{body=await request.json();}catch{return json({error:"INVALID_JSON"},400);}
  if(!body||typeof body!=="object"||typeof body.action!=="string"||!["status","note","review","followup","quote"].includes(body.action))return json({error:"INVALID_ACTION"},422);
  if(JSON.stringify(body).length>6000)return json({error:"REQUEST_TOO_LARGE"},413);
  const {data,error}=await client.rpc("rfq_admin_action",{
    p_id:params.id!,p_actor:actor,p_action:body.action,p_data:body
  });
  if(error)return json({error:"ACTION_REJECTED",message:"Invalid state, insufficient evidence, or invalid action fields."},422);
  return json({updated:true,lead:data});
};
