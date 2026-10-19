import test from "node:test";
import assert from "node:assert/strict";
import { canonicalUrl, approvedSitemapPaths, isApprovedProduction, relationshipState, sitemapXml, webpageSchema, validateCanonicalOrigin } from "../src/lib/seo.ts";
import { validateSEOPage, validateContentBatch, mayPublishPage, claimIsPublishable, approvedOemAliases, projectPublicLinks, adaptPhase5Product } from "../src/lib/seo-content.ts";
import { normalizeIdentifier, searchProducts } from "../src/lib/search.ts";
import fixtures from "../src/contracts/seo02/examples.json" with { type: "json" };
const preview={ VERCEL_ENV:"preview", SEO_APPROVED_FOR_INDEXING:"true" };
const production={ VERCEL_ENV:"production", SEO_APPROVED_FOR_INDEXING:"true", APPROVED_CANONICAL_ORIGIN:"https://twd.andel-vps.space" };
const records=[
 { sku:"SP211C006-TWD",partNumber:"SP211C006",title:"Clutch assembly",modelFamily:"SP211",family:"Clutch",status:"DRAFT" },
 { sku:"SP211P304-TWD",partNumber:"SP211P304",title:"Held PTO",modelFamily:"SP211",family:"PTO",status:"HOLD" },
 { sku:"SP111P340-TWD",partNumber:"SP111P340",title:"Held PTO",modelFamily:"SP111",family:"PTO",status:"HOLD" },
];
test("canonical URLs use source-code host, strip trailing slash and reject preview domains",()=>{
 assert.equal(canonicalUrl("/products/sp211c006-twd/"),"https://twd.andel-vps.space/products/sp211c006-twd/");
 assert.throws(()=>canonicalUrl("//evil.example"),/site-relative/);
});
test("preview is nonindexable and only approved page records enter sitemap",()=>{
 assert.equal(isApprovedProduction(preview),false);
 assert.deepEqual(approvedSitemapPaths([{path:"/products",publicationStatus:"Published"}],preview),[]);
 assert.deepEqual(approvedSitemapPaths([{path:"/products",publicationStatus:"Published",releaseApproved:true},{path:"/draft",publicationStatus:"Draft",releaseApproved:true},{path:"/hold",publicationStatus:"Published",held:true,releaseApproved:true},{path:"/unapproved",publicationStatus:"Published"}],production),["/products/"]);
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
 assert.equal(relationshipState(r),"unverified"); // family evidence also requires signoff
 assert.equal(relationshipState({...r,Scope:"Exact",PublishRule:"Review"}),"pending-review");
 assert.equal(relationshipState({...r,Scope:"Exact",PublishRule:"Yes"}),"unverified"); // URL alone is NOT technical approval
 const signoff={...r,Scope:"Exact",PublishRule:"Yes",claimId:"claim-test",sourceId:"source-test",documentRevision:"2024",
  technicalReviewStatus:"Approved",approvedForPublication:true,technicalReviewerId:"reviewer-test",
  reviewedAt:"2026-10-01",nextReviewAt:"2099-12-31"};
 assert.equal(relationshipState(signoff),"verified-exact");
 assert.equal(relationshipState({...signoff,RelationshipType:"SUPERSEDED_BY"}),"unverified");
 assert.equal(relationshipState({...signoff,nextReviewAt:"2000-01-01"}),"unverified");
 assert.equal(relationshipState({...r,SourceSKU:"SP211P304-TWD",Scope:"Exact",PublishRule:"Yes"}),"held");
 assert.equal(relationshipState({...r,Scope:"Exact",PublishRule:"Yes",SourceURL:""}),"unverified");
});
test("webpage structured data has no fabricated offer, stock or reviews",()=>{
 const d=webpageSchema("Reference","Reference page","/products");
 assert.equal(d["@type"],"WebPage");
 assert.equal(d.url,"https://twd.andel-vps.space/products/");
 assert.equal(d.offers,undefined);
});

test("production indexation fails closed without an approved canonical domain",()=>{
 assert.equal(isApprovedProduction({VERCEL_ENV:"production",SEO_APPROVED_FOR_INDEXING:"true"}),false);
 assert.equal(isApprovedProduction({...production,APPROVED_CANONICAL_ORIGIN:"https://sample.vercel.app"}),false);
 assert.equal(isApprovedProduction(production),true);
 assert.throws(()=>validateCanonicalOrigin("https://sample.vercel.app"),/Invalid/);
 assert.throws(()=>validateCanonicalOrigin("http://example.com"),/Invalid/);
});
const review={technicalApproved:true,commercialApproved:true,assetsApproved:true,identityApproved:true,privacyApproved:true,
 technicalReviewerId:"technical-tester",commercialReviewerId:"commercial-tester",nextReviewAt:"2099-12-31"};
const page=(over={})=>({
 id:"test-sp211c006",type:"sku",canonicalPath:"/parts/sp211c006/",intent:"part number lookup",
 title:"Twin Disc SP211C006 Reference Part",h1:"Twin Disc SP211C006",
 metaDescription:"Reference test fixture for a specific part number with required model verification.",
 status:"Published",sourceIds:["fake-source"],claims:[],review,sections:["Identification","Compatibility limits"],
 links:[],sku:"SP211C006-TWD",partNumber:"SP211C006",contentHash:"fixture-hash",
 extra:{partDefinitionClaimIds:["fixture-claim"]},...over
});
const claim=(over={})=>({SourceSKU:"SP211C006-TWD",RelationshipType:"OEM_CROSS_REFERENCE",
 TargetType:"OEM-part",Target:"900-6943-78",Scope:"Exact",EvidenceLevel:"Official",
 PublishRule:"Yes",SourceURL:"https://example.org/fixture",Notes:"TEST ONLY",claimId:"fake-claim",
 sourceRowId:"row-1",sourceId:"fake-source",documentRevision:"1",technicalReviewStatus:"Approved",
 approvedForPublication:true,technicalReviewerId:"technical-tester",
 reviewedAt:"2026-10-01",nextReviewAt:"2099-12-31",...over
});
test("SEO-02 typed adapter accepts valid signed test fixture but never infers approval from draft",()=>{
 assert.equal(validateSEOPage(page()).valid,true);
 assert.equal(mayPublishPage(page()),true);
 assert.equal(mayPublishPage(page({status:"Approved"})),false);
 assert.equal(mayPublishPage(page({sourceIds:[]})),false);
 assert.equal(mayPublishPage(page({missingEvidence:["unsourced numerical value"]})),false);
 assert.equal(mayPublishPage(page({review:{...review,technicalApproved:false}})),false);
 assert.equal(mayPublishPage(page({review:{...review,nextReviewAt:"2000-01-01"}})),false);
});
test("schema adapter rejects missing fields, invalid types and duplicate canonical intents",()=>{
 assert.equal(validateSEOPage(page({extra:{}})).valid,false);
 assert.equal(validateSEOPage(page({title:"x"})).valid,false);
 assert.equal(validateSEOPage(page({sections:[]})).valid,false);
 assert.equal(validateSEOPage(page({canonicalPath:"/bad?utm=test/"})).valid,false);
 assert.equal(validateContentBatch([page(),page({id:"duplicate",canonicalPath:"/bad?utm=test/"})]).valid,false);
 assert.equal(validateContentBatch([page(),page({id:"other",canonicalPath:"/parts/sp211c006/"})]).valid,false);
});
test("HOLD assembly never publishes even if manually marked Published",()=>{
 assert.equal(validateSEOPage(page({sku:"SP211P304-TWD"})).valid,false);
 assert.equal(mayPublishPage(page({sku:"SP111P340-TWD"})),false);
 assert.equal(adaptPhase5Product({SKU:"SP211P304-TWD",TwinDiscPartNumber:"SP211P304",ProductTitle:"Legacy",
  ProductFamily:"PTO",TwinDiscModelFamily:"SP211",PricingMode:"RFQ",PublicationStatus:"Published",PrimarySource:"fixture"},[]).status,"HOLD");
});
test("Review OEM, Family-only, unsourced specs and supersessions never become exact aliases",()=>{
 assert.equal(claimIsPublishable(claim()),true);
 assert.equal(claimIsPublishable(claim({PublishRule:"Review"})),false);
 assert.equal(claimIsPublishable(claim({PublishRule:"Family-only",Scope:"Family"})),true);
 assert.equal(claimIsPublishable(claim({documentRevision:null})),false);
 assert.equal(claimIsPublishable(claim({technicalReviewStatus:"NeedsRevalidation"})),false);
 assert.equal(claimIsPublishable(claim({RelationshipType:"SERVICE_REPLACED_BY"})),false);
 assert.deepEqual(approvedOemAliases([claim(),claim({claimId:"review",Target:"unverified",PublishRule:"Review"})],"SP211C006-TWD"),["900-6943-78"]);
});
test("search OEM aliases are optional approved-only inputs and never imply machine fit",()=>{
 const aliases=approvedOemAliases([claim(),claim({Target:"unverified",PublishRule:"Review"})],"SP211C006-TWD");
 const result=searchProducts("900 6943 78",records,{"SP211C006-TWD":aliases});
 assert.equal(result[0].kind,"exact-oem");
 assert.match(result[0].message,/fit remains unverified/);
 assert.equal(searchProducts("unverified",records,{"SP211C006-TWD":aliases})[0].kind,"no-match");
});
test("related pages require published destinations; cards cannot claim unsupported replacement",()=>{
 const parent=page({links:[
  {href:"/resources/identification/",anchor:"Identification",relation:"guide",evidenceClaimIds:[]},
  {href:"/resources/identification/",anchor:"Duplicate",relation:"guide",evidenceClaimIds:[]},
  {href:"/parts/fake/",anchor:"Unsourced replacement",relation:"replacement",evidenceClaimIds:[]},
  {href:"/parts/sp211p304/",anchor:"Held",relation:"related",evidenceClaimIds:[]},
 ]});
 const target=page({id:"guide",type:"identification",canonicalPath:"/resources/identification/",
  extra:{identificationChecklist:["serial"],safeObservationScope:"nameplate only"}});
 const held=page({id:"held",canonicalPath:"/parts/sp211p304/",sku:"SP211P304-TWD"});
 const links=projectPublicLinks(parent,[target,held]);
 assert.equal(links.length,1);
 assert.equal(links[0].href,"/resources/identification/");
});
test("invalid SKU record fails safely and does not ingest private fields",()=>{
 assert.throws(()=>adaptPhase5Product({SKU:"",TwinDiscPartNumber:"",ProductTitle:""} ,[]),/Incomplete/);
});

test("all eleven SEO-02 architectural examples stay draft and validate syntactically",()=>{
 assert.equal(fixtures.length,11);
 assert.equal(validateContentBatch(fixtures).valid,true,validateContentBatch(fixtures).errors.join("; "));
 assert.ok(fixtures.every(page=>page.status==="Research"&&!mayPublishPage(page)));
 assert.equal(new Set(fixtures.map(page=>page.canonicalPath)).size,11);
});
test("trailing slash policy prevents duplicate canonical variants",()=>{
 assert.equal(canonicalUrl("/parts/sp211c006"),canonicalUrl("/parts/sp211c006/"));
 assert.equal(canonicalUrl("/parts/sp211c006/"),"https://twd.andel-vps.space/parts/sp211c006/");
});
