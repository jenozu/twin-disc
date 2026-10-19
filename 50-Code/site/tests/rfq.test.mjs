import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import {validateRFQ} from "../src/lib/rfq/schema.ts";
import {initialStatus,isHeldPart,canTransition,canVerifyCandidate} from "../src/lib/rfq/workflow.ts";
import {safePublicAnalytics} from "../src/lib/rfq/analytics.ts";
const sample={category:"unsure",reason:"unknown",condition:"out_of_service",urgency:"asap",
 name:"Synthetic Customer",email:"synthetic@example.invalid",phone:"",city:"Ottawa",province:"Ontario",
 preferred_contact:"email",privacy_acknowledged:true,marketing_consent:false};
function valid(payload){const r=validateRFQ(payload);assert.equal(r.ok,true,JSON.stringify(r));return r.value;}
test("unknown model accepted; technical identifiers optional",()=>{
 const value=valid(sample);assert.equal(value.model_number,"");
 assert.equal(initialStatus({}),"NEEDS_IDENTIFICATION");
});
test("exact identifiers do not prove fit",()=>{
 const v=valid({...sample,part_number:"SP211C006"});
 assert.equal(v.part_number,"SP211C006");assert.equal(initialStatus({part_number:"SP211C006"}),"NEW");
 assert.equal(canTransition("NEW","READY_TO_QUOTE"),false);
});
test("held SKUs cannot be verified",()=>{
 for(const sku of ["SP211P304-TWD","SP111P340-TWD"]){
  assert.equal(isHeldPart(sku),true);
  assert.equal(canVerifyCandidate(sku,"Yes","Exact","https://example.org/manual"),false);
 }
});
test("family-only approval is never exact-machine fit",()=>{
 assert.equal(canVerifyCandidate("SP211C006","Family-only","Family","https://example.org/doc"),false);
 assert.equal(canTransition("COMPATIBILITY_REVIEW","READY_TO_QUOTE",[
 {candidate_part:"SP211C006",scope:"Family",publish_rule:"Family-only",verified:true,
  source_url:"https://example.org/doc",reviewer_id:"reviewer",reviewed_at:"2026-10-19"}]),false);
});
test("valid email or phone, no marketing autoopt-in",()=>{
 const value=valid({...sample,email:"",phone:"+1 613 555 0142",preferred_contact:"phone"});
 assert.equal(value.marketing_consent,false);
});
test("contact and privacy acknowledgment are mandatory",()=>{
 assert.equal(validateRFQ({...sample,email:"",phone:""}).ok,false);
 assert.equal(validateRFQ({...sample,privacy_acknowledged:false}).ok,false);
});
test("field lengths, enums and forged opt-in fail",()=>{
 assert.equal(validateRFQ({...sample,category:"not-a-product"}).ok,false);
 assert.equal(validateRFQ({...sample,description:"x".repeat(2001)}).ok,false);
 assert.equal(validateRFQ({...sample,honeypot:"robot"}).ok,false);
});
test("readiness requires signed exact Yes evidence, not urgency",()=>{
 assert.equal(canTransition("COMPATIBILITY_REVIEW","READY_TO_QUOTE"),false);
 assert.equal(canTransition("COMPATIBILITY_REVIEW","READY_TO_QUOTE",[
 {candidate_part:"SP211C006",publish_rule:"Yes",scope:"Exact",verified:true,
  source_url:"https://example.org/source",reviewer_id:"technical",reviewed_at:"2026-10-19"}]),true);
});
test("safe conversion event strips PII and unbounded values",()=>{
 assert.deepEqual(safePublicAnalytics("rfq_submit_success",{step:3,category:"pto",
  email:"secret@example.org",serial:"S123",source:"private"}),{event:"rfq_submit_success",step:3,category:"pto"});
 assert.equal(safePublicAnalytics("custom",{}),null);
});
test("frontend references only self-hosted proxy, no Supabase",()=>{
 const gateway=readFileSync(new URL("../src/lib/rfq/gateway.ts",import.meta.url),"utf8");
 const admin=readFileSync(new URL("../src/scripts/rfq-admin.ts",import.meta.url),"utf8");
 const pkg=readFileSync(new URL("../package.json",import.meta.url),"utf8");
 const wizard=readFileSync(new URL("../src/scripts/rfq-wizard.ts",import.meta.url),"utf8");
 assert.doesNotMatch(pkg+gateway+admin,/supabase/i);
 assert.match(gateway,/x-internal-gateway-token/);
 assert.match(admin,/credentials:"same-origin"/);
 assert.match(wizard,/rfq_submit_success/);
});
