import {timingSafeEqual} from "node:crypto";
import type {FastifyInstance} from "fastify";
export function constantTimeEqual(a:string,b:string):boolean{
 const aa=Buffer.from(a),bb=Buffer.from(b);
 return aa.length===bb.length&&timingSafeEqual(aa,bb);
}
export function installGatewayGuard(app:FastifyInstance,secret:string){
 app.addHook("onRequest",async(req,reply)=>{
  if(req.url==="/healthz")return;
  const token=req.headers["x-internal-gateway-token"];
  if(typeof token!=="string"||!constantTimeEqual(token,secret))return reply.code(403).send({error:"GATEWAY_REJECTED"});
  // No CORS response headers; browsers may only call the same-origin Vercel gateway.
  if(req.method!=="GET"&&req.method!=="HEAD"){
   if(req.headers["x-gateway-origin-verified"]!=="1")return reply.code(403).send({error:"ORIGIN_REJECTED"});
  }
 });
}
