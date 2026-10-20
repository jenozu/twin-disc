import type {APIRoute} from "astro";
import {forwardToVps} from "../../../lib/rfq/gateway.ts";
export const prerender=false;
const forward:APIRoute=({request,params})=>{
 const suffix=params.path||"";
 if(!/^[a-z0-9/-]*$/i.test(suffix)||suffix.includes(".."))
  return new Response(JSON.stringify({error:"INVALID_PATH"}),{status:400});
 return forwardToVps(request,"/api/admin/"+suffix);
};
export const GET=forward;
export const POST=forward;
export const PATCH=forward;
