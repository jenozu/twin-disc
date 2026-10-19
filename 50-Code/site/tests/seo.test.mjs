import test from "node:test";
import assert from "node:assert/strict";
import { canonicalUrl, approvedSitemapPaths, isApprovedProduction, relationshipState, sitemapXml, webpageSchema } from "../src/lib/seo.ts";
import { normalizeIdentifier, searchProducts } from "../src/lib/search.ts";
const preview={ VERCEL_ENV:"preview", SEO_APPROVED_FOR_INDEXING:"true" };
const production={ VERCEL_ENV:"production", SEO_APPROVED_FOR_INDEXING:"true" };
const records=[
 { sku:"SP211C006-TWD",partNumber:"SP211C006",title:"Clutch assembly",modelFamily:"SP211",family:"Clutch",status:"DRAFT" },
 { sku:"SP211P304-TWD",partNumber:"SP211P304",title:"Held PTO",modelFamily:"SP211",family:"PTO",status:"HOLD" },
 { sku:"SP111P340-TWD",partNumber:"SP111P340",title:"Held PTO",modelFamily:"SP111",family:"PTO",status:"HOLD" },
];
test("canonical URLs use source-code host, strip trailing slash and reject preview domains",()=>{
 assert.equal(canonicalUrl("/products/sp211c006-twd/"),"https://twd.andel-vps.space/products/sp211c006-twd");
 assert.throws(()=>canonicalUrl("//evil.example"),/site-relative/);
});
test("preview is nonindexable and only approved page records enter sitemap",()=>{
 assert.equal(isApprovedProduction(preview),false);
 assert.deepEqual(approvedSitemapPaths([{path:"/products",publicationStatus:"Published"}],preview),[]);
 assert.deepEqual(approvedSitemapPaths([{path:"/products",publicationStatus:"Published"},{path:"/draft",publicationStatus:"Draft"},{path:"/hold",publicationStatus:"Published",held:true}],production),["/products"]);
 assert.ok(!sitemapXml([]).includes("<loc>"));
});
test("SP211C006 exact identifier search tolerates hyphens and spaces without claiming fitment",()=>{
 assert.equal(normalizeIdentifier("sp 211-c006"),"SP211C006");
 const match=searchProducts("SP211C006",records);
 assert.equal(match[0].kind,"exact-part");
 assert.equal(match[0].record.partNumber,"SP211C006");
 assert.match(match[0].message,/fitment remains unverified/);
});
test("family match cannot be construed as exact-fit",()=>{
 const match=searchProducts("SP211",records);
 assert.equal(match[0].kind,"model-family");
 assert.match(match[0].message,/not a verified equipment-fit/);
});
test("held products are never searchable",()=>{
 assert.equal(searchProducts("SP211P304-TWD",records)[0].kind,"no-match");
 assert.equal(searchProducts("SP111P340",records)[0].kind,"no-match");
});
test("only source-backed exact Yes relationships qualify for verified exact display",()=>{
 const r={SourceSKU:"SP211C006-TWD",RelationshipType:"OEM_CROSS_REFERENCE",Target:"900-6943-78",Scope:"Family",EvidenceLevel:"Source",PublishRule:"Family-only",SourceURL:"https://example.com"};
 assert.equal(relationshipState(r),"family-only");
 assert.equal(relationshipState({...r,Scope:"Exact",PublishRule:"Review"}),"pending-review");
 assert.equal(relationshipState({...r,Scope:"Exact",PublishRule:"Yes"}),"verified-exact");
 assert.equal(relationshipState({...r,SourceSKU:"SP211P304-TWD",Scope:"Exact",PublishRule:"Yes"}),"held");
 assert.equal(relationshipState({...r,Scope:"Exact",PublishRule:"Yes",SourceURL:""}),"unverified");
});
test("webpage structured data has no fabricated offer, stock or reviews",()=>{
 const d=webpageSchema("Reference","Reference page","/products");
 assert.equal(d["@type"],"WebPage");
 assert.equal(d.url,"https://twd.andel-vps.space/products");
 assert.equal(d.offers,undefined);
});
