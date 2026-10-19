import type { APIRoute } from "astro";
import { db,requireAdmin,adminError,json,BUCKET } from "../../../../lib/rfq/server";
export const prerender=false;
export const GET:APIRoute=async({request,params})=>{
  let client;
  try{client=db();await requireAdmin(request,client);}catch(e){return adminError(e);}
  const {data,error}=await client.from("rfq_attachments").select("storage_key")
    .eq("id",params.id||"").single();
  if(error||!data)return json({error:"NOT_FOUND"},404);
  const result=await client.storage.from(BUCKET).createSignedUrl(data.storage_key,60,{
    download:true
  });
  if(result.error||!result.data)return json({error:"ATTACHMENT_UNAVAILABLE"},503);
  return json({url:result.data.signedUrl,expiresInSeconds:60});
};
