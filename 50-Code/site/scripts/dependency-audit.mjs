import { spawnSync } from "node:child_process";
const p=spawnSync("npm",["audit","--json","--omit=dev"],{encoding:"utf8",timeout:45000,maxBuffer:10*1024*1024});
try {
 const json=JSON.parse(p.stdout||"{}");
 const vulnerabilities=Object.entries(json.vulnerabilities??{}).map(([name,v])=>({
  name,severity:v.severity,range:v.range,fix:v.fixAvailable,via:(v.via??[]).filter(x=>typeof x==="object").map(x=>x.url||x.name||x.title)
 }));
 console.log("SEO-03 npm audit (production dependency tree): "+JSON.stringify({total:json.metadata?.vulnerabilities??null,vulnerabilities}));
 if(p.status!==0&&vulnerabilities.length===0)console.warn("Audit exit "+p.status+": "+(json.error?.summary??p.stderr??"unknown"));
} catch(error) {console.warn("Audit unavailable: "+String(error)+" "+(p.stderr??"").slice(0,400))}
