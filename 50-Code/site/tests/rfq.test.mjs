import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { validateRFQ } from "../src/lib/rfq/schema.ts";
import { initialStatus,isHeldPart,canTransition,canVerifyCandidate } from "../src/lib/rfq/workflow.ts";
import { submit,validateAttachments,requireAdmin } from "../src/lib/rfq/server.ts";
const sample={
 category:"unsure",reason:"unknown",condition:"out_of_service",urgency:"asap",
 name:"Test Customer",email:"test@example.invalid",phone:"",city:"Ottawa",province:"Ontario",
 preferred_contact:"email",privacy_acknowledged:true,marketing_consent:false
};
function valid(input){const r=validateRFQ(input);assert.equal(r.ok,true,JSON.stringify(r));return r.value;}
test("unknown-model RFQ needs identification and accepts no photos",()=>{
 const v=valid({...sample});assert.equal(v.model_number,"");
 assert.equal(initialStatus(v),"NEEDS_IDENTIFICATION");
});
test("exact part inquiry records identifier without auto approval",()=>{
 const v=valid({...sample,part_number:"SP211C006"});
 assert.equal(v.part_number,"SP211C006");assert.equal(initialStatus(v),"NEW");
 assert.equal(canTransition("NEW","READY_TO_QUOTE"),false);
});
test("held replacement part must not be auto-approved",()=>{
 assert.equal(isHeldPart("sp211p304-twd"),true);
 assert.equal(isHeldPart("SP111P340-TWD"),true);
 assert.equal(canVerifyCandidate("SP211P304-TWD","Yes","Exact","https://example.org/manual"),false);
});
test("family-level relationship is not exact-machine fit",()=>{
 assert.equal(canVerifyCandidate("SP211C006","Family-only","Family","https://example.org/manual"),false);
 assert.equal(canTransition("COMPATIBILITY_REVIEW","READY_TO_QUOTE",
  [{candidate_part:"SP211C006",scope:"Family",publish_rule:"Family-only",verified:true,
    source_url:"https://example.org/manual",reviewer_id:"test",reviewed_at:"2026-10-19"}]),false);
});
test("missing contact is a clear validation error",()=>{
 const r=validateRFQ({...sample,email:"",phone:""});
 assert.equal(r.ok,false);assert.match(r.errors.contact,/email|telephone/);
});
test("valid email OR phone accepted, optional marketing unchecked",()=>{
 const v=valid({...sample,email:"",phone:"+1 613 555 0134",preferred_contact:"phone"});
 assert.equal(v.marketing_consent,false);
 assert.equal(validateRFQ({...sample,privacy_acknowledged:false}).ok,false);
});
test("attachment content sniffing, count, size and media restrictions",async()=>{
 const jpg=new File([Uint8Array.from([255,216,255,0,0,217])],"plate.jpg",{type:"image/jpeg"});
 const pdf=new File([new TextEncoder().encode("%PDF-1.7 test")],"manual.pdf",{type:"application/pdf"});
 const files=await validateAttachments([jpg,pdf]);
 assert.deepEqual(files.map(f=>f.type),["image/jpeg","application/pdf"]);
 await assert.rejects(validateAttachments([new File(["evil"],"evil.exe",{type:"image/jpeg"})]),/FILE_TYPE/);
 await assert.rejects(validateAttachments([new File([new Uint8Array(1000001)],"bad.pdf",{type:"application/pdf"})]),/FILE_SIZE/);
 await assert.rejects(validateAttachments([jpg,jpg,jpg,jpg]),/FILES_TOO_MANY/);
});
test("submission UUID retry is idempotent in isolated mock database (not real Supabase)",async()=>{
 const row=new Map();
 const fake={rpc:async(_f,args)=>{
   const previous=row.get(args.p_idempotency);
   if(previous) return {data:{...previous,duplicate:true},error:null};
   const data={id:"11111111-1111-1111-1111-111111111111",reference:"RFQ-TEST00000001",
     status:args.p_input.status,duplicate:false};
   row.set(args.p_idempotency,data);return {data,error:null};
 }};const v=valid(sample),key="11111111-1111-4111-8111-111111111111";
 const first=await submit(fake,v,key,"127.0.0.1","isolated-test-salt");
 const again=await submit(fake,v,key,"127.0.0.1","isolated-test-salt");
 assert.equal(first.duplicate,false);assert.equal(again.duplicate,true);assert.equal(row.size,1);
});
test("database failure fails closed instead of showing submission success",async()=>{
 const failing={rpc:async()=>({data:null,error:{message:"database offline"}})};
 await assert.rejects(submit(failing,valid(sample),"11111111-1111-4111-8111-111111111111",
    "127.0.0.1","test-salt"),/PERSISTENCE_FAILURE/);
});
test("unauthorized admin cannot access private records",async()=>{
 process.env.RFQ_ADMIN_USER_IDS="11111111-1111-4111-8111-111111111111";
 const fake={auth:{getUser:async()=>({data:{user:null},error:{message:"invalid"}})}};
 await assert.rejects(requireAdmin(new Request("https://example.org/api/admin/rfqs"),fake),/UNAUTHORIZED/);
 delete process.env.RFQ_ADMIN_USER_IDS;
});
test("status machine blocks invalid jumps and urgency cannot bypass review",()=>{
 assert.equal(canTransition("NEEDS_IDENTIFICATION","QUOTED"),false);
 assert.equal(canTransition("COMPATIBILITY_REVIEW","READY_TO_QUOTE"),false);
 assert.equal(canTransition("COMPATIBILITY_REVIEW","READY_TO_QUOTE",[
   {candidate_part:"SP211C006",publish_rule:"Yes",scope:"Exact",verified:true,
    source_url:"https://example.org/manual",reviewer_id:"reviewer",reviewed_at:"2026-10-19"}]),true);
});
test("mobile and privacy source contract checks (not browser or E2E)",()=>{
 const css=readFileSync(new URL("../src/styles/rfq-04.css",import.meta.url),"utf8");
 const wizard=readFileSync(new URL("../src/scripts/rfq-wizard.ts",import.meta.url),"utf8");
 const migration=readFileSync(new URL("../supabase/migrations/202610190001_rfq.sql",import.meta.url),"utf8");
 assert.match(css,/@media\(max-width:650px\)/);
 assert.match(wizard,/rfq_submit_success/);
 assert.doesNotMatch(wizard,/payload\.email[^;]*rfq_submit_success/);
 assert.match(migration,/alter table public\.rfq_contacts enable row level security/i);
 assert.match(migration,/insert into public\.rfq_notifications/i);
});

import { safePublicAnalytics } from "../src/lib/rfq/analytics.ts";
test("public analytics strictly excludes PII and customer-provided identifiers",()=>{
 const detail=safePublicAnalytics("rfq_submit_success",{step:3,category:"pto",email:"secret@example.invalid",phone:"123456789",part_number:"ABC",source:"private"});
 assert.deepEqual(detail,{event:"rfq_submit_success",step:3,category:"pto"});
 assert.equal(safePublicAnalytics("unknown_event",{email:"sensitive"}),null);
});
