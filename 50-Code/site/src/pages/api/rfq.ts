import type { APIRoute } from "astro";
import { validateRFQ } from "../../lib/rfq/schema";
import { db,submit,validateAttachments,storeFiles,json } from "../../lib/rfq/server";
export const prerender=false;
export const POST:APIRoute=async({request})=>{
  // Public endpoint: no cookies, no session, no cross-origin browser submission.
  const origin=request.headers.get("origin");
  if(origin && origin!==new URL(request.url).origin) return json({error:"ORIGIN_REJECTED"},403);
  if(!request.headers.get("content-type")?.startsWith("multipart/form-data"))return json({error:"EXPECTED_MULTIPART"},415);
  const declared=Number(request.headers.get("content-length")||0);
  if(declared>3_500_000) return json({error:"REQUEST_TOO_LARGE"},413);
  let form:FormData;
  try{form=await request.formData();}catch{return json({error:"INVALID_FORM"},400);}
  const raw=String(form.get("payload")||"");
  if(raw.length>22000)return json({error:"REQUEST_TOO_LARGE"},413);
  let parsed:unknown;
  try{parsed=JSON.parse(raw);}catch{return json({error:"INVALID_JSON"},400);}
  const result=validateRFQ(parsed);
  if(!result.ok)return json({error:"VALIDATION",fields:result.errors},422);
  let files:Awaited<ReturnType<typeof validateAttachments>>;
  try{files=await validateAttachments(form.getAll("attachments"));}
  catch(e){return json({error:e instanceof Error?e.message:"INVALID_FILE"},422);}
  const key=String(form.get("idempotency_key")||"");
  const ip=request.headers.get("x-real-ip")||request.headers.get("x-forwarded-for")?.split(",")[0]||"unknown";
  try{
    const client=db();
    const created=await submit(client,result.value,key,ip,process.env.RFQ_RATE_SALT||import.meta.env.RFQ_RATE_SALT||"");
    const failed=created.duplicate?[]:await storeFiles(client,created.id,files);
    return json({
      accepted:true,reference:created.reference,status:created.status,
      duplicate:created.duplicate,attachmentFailures:failed.length
    },created.duplicate?200:201);
  }catch(e){
    const code=e instanceof Error?e.message:"PERSISTENCE_FAILURE";
    if(code==="BACKEND_NOT_CONFIGURED")return json({error:"SUBMISSION_NOT_CONFIGURED"},503);
    if(code==="RATE_LIMIT")return json({error:"TOO_MANY_REQUESTS"},429);
    if(code==="IDEMPOTENCY_CONFLICT")return json({error:code},409);
    if(code==="INVALID_IDEMPOTENCY")return json({error:code},422);
    return json({error:"SUBMISSION_UNAVAILABLE"},503);
  }
};
export const GET:APIRoute=()=>json({error:"METHOD_NOT_ALLOWED"},405);
