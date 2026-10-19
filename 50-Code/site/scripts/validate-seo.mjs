import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
const dist = new URL("../dist/", import.meta.url);
const errors = [];
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes:true });
  const found=[];
  for(const e of entries) {
    const loc=new URL(e.name + (e.isDirectory()?"/":""),dir);
    if(e.isDirectory()) found.push(...await walk(loc));
    else if(e.name.endsWith(".html")) found.push(loc);
  }
  return found;
}
const htmlFiles=await walk(dist);
const canonicals=new Map();
const routeSet=new Set(htmlFiles.map(u=>decodeURIComponent(u.pathname.replace(dist.pathname,"")).replace(/index\.html$/,"").replace(/\.html$/,"").replace(/\/$/,"")||"/"));
const localHosts=new Set(["twd.andel-vps.space"]);
for(const file of htmlFiles) {
 const source=await readFile(file,"utf-8");
 const route=decodeURIComponent(file.pathname.replace(dist.pathname,""));
 const count=(regex)=>[...source.matchAll(regex)].length;
 const canonical=source.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
 if(!/<title>[^<]+<\/title>/.test(source))errors.push(route+": missing title");
 if(!/<meta name="description" content="[^"]+"/.test(source))errors.push(route+": missing description");
 if(!canonical || !/^https:\/\/twd\.andel-vps\.space\//.test(canonical))errors.push(route+": missing/wrong canonical");
 if(count(/<link rel="canonical"/g)!==1)errors.push(route+": duplicate canonicals");
 if(count(/<h1\b/g)!==1)errors.push(route+": h1 count "+count(/<h1\b/g));
 if(!/<meta name="robots" content="noindex,/.test(source))errors.push(route+": preview page is indexable");
 if(canonical) {const other=canonicals.get(canonical);if(other && other!==route)errors.push(route+": shared canonical with "+other);canonicals.set(canonical,route)}
 if(/SP211P304-TWD|SP111P340-TWD/i.test(route))errors.push(route+": held product exposed");
 for(const match of source.matchAll(/<a\b[^>]*href="(\/[^"#?]*)[^"]*"/g)) {
   const target=match[1].replace(/\/$/,"")||"/";
   if(!routeSet.has(target) && !target.startsWith("/_astro/"))errors.push(route+": broken internal destination "+target);
 }
 for(const json of source.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
   try{JSON.parse(json[1]);}catch{errors.push(route+": invalid JSON-LD")}
 }
}
const robots=await readFile(new URL("robots.txt",dist),"utf-8");
if(!robots.includes("Disallow: /"))errors.push("preview robots not blocked");
const sitemap=await readFile(new URL("sitemap.xml",dist),"utf-8");
if(sitemap.includes("<loc>"))errors.push("unapproved URLs exposed by preview sitemap");
if(errors.length){console.error(errors.join("\n"));process.exitCode=1}
else console.log("SEO validation passed: "+htmlFiles.length+" generated HTML pages, canonical/robots/link checks, preview sitemap and JSON-LD");
