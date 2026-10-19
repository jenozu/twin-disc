/** Server-only same-origin gateway. Backend credentials never reach browser assets. */
const NO_STORE={"cache-control":"no-store","x-content-type-options":"nosniff"};
function failure(code:string,status:number){
 return new Response(JSON.stringify({error:code}),{status,headers:{"content-type":"application/json",...NO_STORE}});
}
export async function forwardToVps(request:Request,route:string){
 const url=process.env.RFQ_BACKEND_URL,secret=process.env.RFQ_BACKEND_SHARED_TOKEN;
 if(!url||!secret||secret.length<32)return failure("SUBMISSION_NOT_CONFIGURED",503);
 let target:URL;
 try{
  const origin=new URL(url);
  if(origin.pathname!=="/"||origin.search||origin.hash||origin.username||origin.password||
    (origin.protocol!=="https:"&&!(process.env.NODE_ENV!=="production"&&origin.origin.startsWith("http://127.0.0.1:"))))
     return failure("INVALID_BACKEND_CONFIG",503);
  target=new URL(route+new URL(request.url).search,origin);
 }catch{return failure("INVALID_BACKEND_CONFIG",503);}
 const method=request.method;
 const expected=new URL(request.url).origin;
 const supplied=request.headers.get("origin");
 if(!["GET","HEAD"].includes(method)&&supplied!==expected)return failure("ORIGIN_REJECTED",403);
 const declared=Number(request.headers.get("content-length")||0);
 if(declared>3_500_000)return failure("REQUEST_TOO_LARGE",413);
 const headers=new Headers({
  "x-internal-gateway-token":secret,
  "x-gateway-origin-verified":supplied===expected?"1":"0",
  "accept":"application/json"
 });
 for(const key of ["content-type","cookie","x-csrf-token"])
  if(request.headers.has(key))headers.set(key,request.headers.get(key)!);
 // Only the Vercel platform's forwarded value may influence the rate bucket.
 // On other hosts, public inquiries share a conservative bucket.
 const v=process.env.VERCEL==="1"?request.headers.get("x-vercel-forwarded-for"):"";
 headers.set("x-gateway-rate-identity",v?.split(",")[0]?.trim().slice(0,80)||"shared");
 try{
  const body=["GET","HEAD"].includes(method)?undefined:await request.arrayBuffer();
  if(body&&body.byteLength>3_500_000)return failure("REQUEST_TOO_LARGE",413);
  const response=await fetch(target.toString(),{method,headers,body,redirect:"manual",signal:AbortSignal.timeout(20000)});
  const outputHeaders=new Headers(NO_STORE);
  for(const name of ["content-type","content-disposition","set-cookie","content-security-policy"])
   if(response.headers.has(name))outputHeaders.set(name,response.headers.get(name)!);
  // Do not forward internal headers or Location redirects.
  return new Response(response.body,{status:response.status,headers:outputHeaders});
 }catch{return failure("BACKEND_UNAVAILABLE",503);}
}
