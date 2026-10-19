/** Client reads only the public anon key. Server verifies Supabase user ID on every API call. */
import { createClient } from "@supabase/supabase-js";
const url=import.meta.env.PUBLIC_SUPABASE_URL;
const anon=import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
const login=document.querySelector<HTMLFormElement>("#admin-login")!;
const alertBox=document.querySelector<HTMLElement>("#admin-alert")!;
const workspace=document.querySelector<HTMLElement>("#admin-workspace")!;
const list=document.querySelector<HTMLElement>("#admin-list")!;
const detail=document.querySelector<HTMLElement>("#admin-detail")!;
const actions=document.querySelector<HTMLFormElement>("#admin-actions")!;
const counts=document.querySelector<HTMLElement>("#admin-counts")!;
const alertText=(s:string)=>{alertBox.textContent=s;};
let token="",selected="";
const supabase=url&&anon?createClient(url,anon,{auth:{
  persistSession:false,autoRefreshToken:false,detectSessionInUrl:false
}}):null;
if(!supabase){login.hidden=true;alertText("Protected dashboard unavailable: administrator authentication is not configured.");}
async function api(path:string,init:RequestInit={}){
  const response=await fetch(path,{...init,headers:{
    "authorization":"Bearer "+token,
    ...(init.body?{"content-type":"application/json"}:{})
  },cache:"no-store",credentials:"omit"});
  const result=await response.json();
  if(!response.ok)throw new Error(result.error||"Request failed");
  return result;
}
function line(parent:HTMLElement,label:string,value:unknown){
  const wrap=document.createElement("p");
  const strong=document.createElement("strong");strong.textContent=label+": ";
  const text=document.createElement("span");text.textContent=String(value??"—");
  wrap.append(strong,text);parent.append(wrap);
}
const statuses=["NEW","NEEDS_IDENTIFICATION","FAMILY_IDENTIFIED","AWAITING_INFORMATION",
  "COMPATIBILITY_REVIEW","TECHNICAL_HOLD","READY_TO_QUOTE","QUOTED","FOLLOW_UP","WON","LOST","CLOSED"];
async function loadList(){
  const f=new FormData(document.querySelector<HTMLFormElement>("#admin-filters")!);
  const params=new URLSearchParams();
  for(const [k,v] of f)if(typeof v==="string"&&v.trim())params.set(k,v);
  const response=await api("/api/admin/rfqs?"+params);
  list.replaceChildren();counts.textContent=response.items.length+" visible inquiries (first 100; apply filters to narrow the queue)";
  const summary:Record<string,number>={};
  for(const item of response.items as any[]){
    summary[item.qualification_status]=(summary[item.qualification_status]||0)+1;
    const btn=document.createElement("button");btn.type="button";
    btn.textContent=item.reference+" / "+item.qualification_status+" / "+item.urgency;
    btn.addEventListener("click",()=>loadDetail(item.id));
    list.append(btn);
  }
  for(const k of statuses)if(summary[k])line(counts,k,summary[k]);
}
async function loadDetail(id:string){
  selected=id;
  const response=await api("/api/admin/rfqs/"+encodeURIComponent(id));
  const r=response.lead;
  detail.replaceChildren();actions.hidden=false;
  const contact=Array.isArray(r.rfq_contacts)?r.rfq_contacts[0]:r.rfq_contacts;
  const equipment=Array.isArray(r.rfq_equipment)?r.rfq_equipment[0]:r.rfq_equipment;
  for(const [label,value] of Object.entries({
    Reference:r.reference,Created:r.created_at,Status:r.qualification_status,
    Urgency:r.urgency,Category:r.category,RequestedPart:r.part_number,
    Description:r.description,Contact:contact?.contact_name,Company:contact?.company,
    Email:contact?.email,Phone:contact?.phone,City:contact?.city,Province:contact?.province,
    PreferredContact:contact?.preferred_contact,Comments:contact?.comments,
    Model:equipment?.model_number,Serial:equipment?.serial_number,BOM:equipment?.bom_number,
    EquipmentMake:equipment?.equipment_manufacturer,EquipmentModel:equipment?.equipment_model,
    Engine:equipment?.engine,TechnicalNotes:equipment?.technical_notes,
    Source:r.attribution?.source,LandingPage:r.attribution?.landing_page,
    FollowUp:r.follow_up_at,QuotedAmount:r.quoted_amount,QuoteReference:r.quote_reference
  }))line(detail,label,value);
  const reviews=Array.isArray(r.rfq_compatibility_reviews)?r.rfq_compatibility_reviews:[];
  for(const review of reviews)line(detail,"Review",review.candidate_part+" — "+review.verification_status+
    " / "+review.publish_rule+" / "+review.scope+" / "+(review.source_url||"no source"));
  const activity=Array.isArray(r.rfq_activities)?r.rfq_activities:[];
  for(const ev of activity)line(detail,"Activity",ev.created_at+" — "+ev.event_type+" "+
    (ev.previous_status||"")+" → "+(ev.new_status||"")+"; "+(ev.notes||""));
  const files=Array.isArray(r.rfq_attachments)?r.rfq_attachments:[];
  for(const attachment of files){
    const btn=document.createElement("button");btn.type="button";
    btn.textContent="Open private attachment: "+attachment.original_filename;
    btn.addEventListener("click",async()=>{
      try{
        const {url}=await api("/api/admin/attachments/"+encodeURIComponent(attachment.id));
        window.open(url,"_blank","noopener,noreferrer");
      }catch(e){alertText(String(e));}
    });
    detail.append(btn);
  }
}
login?.addEventListener("submit",async(e)=>{
  e.preventDefault();if(!supabase)return;
  const data=new FormData(login);
  alertText("Authenticating…");
  const r=await supabase.auth.signInWithPassword({email:String(data.get("email")||""),
    password:String(data.get("password")||"")});
  if(r.error||!r.data.session){alertText("Sign-in failed.");return;}
  token=r.data.session.access_token;
  try{await loadList();login.hidden=true;workspace.hidden=false;alertText("Authenticated.");}
  catch{token="";await supabase.auth.signOut();alertText("This user is not authorized for the lead dashboard.");}
});
document.querySelector<HTMLFormElement>("#admin-filters")?.addEventListener("submit",async e=>{
  e.preventDefault();try{await loadList();}catch(err){alertText(String(err));}
});
document.querySelector<HTMLButtonElement>("#admin-refresh")?.addEventListener("click",()=>loadList().catch(e=>alertText(String(e))));
document.querySelector<HTMLButtonElement>("#admin-notifications")?.addEventListener("click",async()=>{
  try{const r=await api("/api/admin/notifications",{method:"POST"});alertText("Notifications sent: "+r.sent+"; failed: "+r.failed);}
  catch(e){alertText(String(e));}
});
document.querySelector<HTMLButtonElement>("#admin-signout")?.addEventListener("click",async()=>{
  token="";selected="";if(supabase)await supabase.auth.signOut();
  detail.replaceChildren();list.replaceChildren();workspace.hidden=true;login.hidden=false;alertText("Signed out.");
});
actions.addEventListener("submit",async e=>{
  e.preventDefault();if(!selected)return;
  const btn=(e as SubmitEvent).submitter as HTMLButtonElement;
  const action=btn?.value;
  if(!action)return;
  const fields=new FormData(actions);
  const payload:Record<string,string|boolean>={action};
  for(const [key,value] of fields)if(typeof value==="string")payload[key]=value;
  payload.verified=fields.has("verified");
  btn.disabled=true;
  try{
    await api("/api/admin/rfqs/"+encodeURIComponent(selected),{
      method:"PATCH",body:JSON.stringify(payload)
    });
    await Promise.all([loadDetail(selected),loadList()]);
    alertText("Action recorded with an audit entry.");
  }catch(e){alertText("Action rejected: "+String(e));}
  finally{btn.disabled=false;}
});
