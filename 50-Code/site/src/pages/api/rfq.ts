import type {APIRoute} from "astro";
import {forwardToVps} from "../../lib/rfq/gateway.ts";
export const prerender=false;
export const POST:APIRoute=({request})=>forwardToVps(request,"/api/rfq");
export const GET:APIRoute=()=>new Response(JSON.stringify({error:"METHOD_NOT_ALLOWED"}),{status:405,headers:{"content-type":"application/json"}});
