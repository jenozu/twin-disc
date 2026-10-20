/** Self-hosted staff dashboard; server session cookie is HttpOnly and never read by JS. */
type Inquiry={id:string;reference:string;created_at:string;qualification_status:string;urgency:string;
 category:string;part_number:string|null;model_number:string|null;description:string|null;
 attribution?:Record<string,string>;follow_up_at:string|null;quoted_amount:string|null;quote_reference:string|null;
 rfq_contacts?:Record<string,string>;rfq_equipment?:Record<string,string>;
 rfq_attachments?:{id:string;original_filename:string}[];
 rfq_activities?:{created_at:string;event_type:string;previous_status:string;new_status:string;notes:string}[];
 rfq_compatibility_reviews?:{candidate_part:string;verification_status:string;publish_rule:string;scope:string;source_url:string}[];
};
const login=document.querySelector<HTMLFormElement>("#admin-login")!;
const alertBox=document.querySelector<HTMLElement>("#admin-alert")!;
const workspace=document.querySelector<HTMLElement>("#admin-workspace")!;
const list=document.querySelector<HTMLElement>("#admin-list")!;
const detail=document.querySelector<HTMLElement>("#admin-detail")!;
const actions=document.querySelector<HTMLFormElement>("#admin-actions")!;
const counts=document.querySelector<HTMLElement>("#admin-counts")!;
const filters=document.querySelector<HTMLFormElement>("#admin-filters")!;
const alertText=(s:string)=>{alertBox.textContent=s;};
let csrf="",selected="";
async function api<T>(path:string,init:RequestInit={}):Promise<T>{
 const headers=new Headers(init.headers);
 if(init.body)headers.set("content-type","application/json");
 if(init.method&&!["GET","HEAD"].includes(init.method))headers.set("x-csrf-token",csrf);
 const response=await fetch(path,{...init,headers,cache:"no-store",credentials:"same-origin"});
 const result:unknown=await response.json();
 if(!response.ok){
  const err=result as {error?:string};
  throw Error(err.error||"Request failed");
 }
 return result as T;
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
 const params=new URLSearchParams();
 for(const [k,v] of new FormData(filters))if(typeof v==="string"&&v.trim())params.set(k,v);
 const response=await api<{items:Inquiry[]}>("/api/admin/rfqs?"+params);
 list.replaceChildren();counts.textContent=response.items.length+" visible inquiries (up to 100, use filters to narrow)";
 const summary:Record<string,number>={};
 for(const item of response.items){
  summary[item.qualification_status]=(summary[item.qualification_status]||0)+1;
  const button=document.createElement("button");button.type="button";
  button.textContent=item.reference+" / "+item.qualification_status+" / "+item.urgency;
  button.addEventListener("click",()=>loadDetail(item.id).catch(e=>alertText(String(e))));
  list.append(button);
 }
 for(const name of statuses)if(summary[name])line(counts,name,summary[name]);
}
async function loadDetail(id:string){
 selected=id;
 const {lead:r}=await api<{lead:Inquiry}>("/api/admin/rfqs/"+encodeURIComponent(id));
 detail.replaceChildren();actions.hidden=false;
 const contact=r.rfq_contacts||{},equipment=r.rfq_equipment||{};
 for(const [label,value] of Object.entries({
  Reference:r.reference,Created:r.created_at,Status:r.qualification_status,
  Urgency:r.urgency,Category:r.category,RequestedPart:r.part_number,
  Description:r.description,Contact:contact.contact_name,Company:contact.company,
  Email:contact.email,Phone:contact.phone,City:contact.city,Province:contact.province,
  PreferredContact:contact.preferred_contact,Comments:contact.comments,
  Model:equipment.model_number,Serial:equipment.serial_number,BOM:equipment.bom_number,
  EquipmentMake:equipment.equipment_manufacturer,EquipmentModel:equipment.equipment_model,
  Engine:equipment.engine,TechnicalNotes:equipment.technical_notes,
  Source:r.attribution?.source,LandingPage:r.attribution?.landing_page,
  FollowUp:r.follow_up_at,QuotedAmount:r.quoted_amount,QuoteReference:r.quote_reference
 }))line(detail,label,value);
 for(const review of r.rfq_compatibility_reviews||[])
  line(detail,"Review",review.candidate_part+" / "+review.verification_status+" / "+review.publish_rule+" / "+review.scope+" / "+review.source_url);
 for(const act of r.rfq_activities||[])
  line(detail,"Activity",act.created_at+" / "+act.event_type+" "+(act.previous_status||"")+" → "+(act.new_status||"")+" / "+(act.notes||""));
 for(const file of r.rfq_attachments||[]){
  const button=document.createElement("button");button.type="button";
  button.textContent="Download private attachment: "+file.original_filename;
  button.addEventListener("click",()=>{
   // Same-origin endpoint verifies the server session; no signed/public URLs.
   const link=document.createElement("a");link.href="/api/admin/attachments/"+encodeURIComponent(file.id);
   link.rel="noopener noreferrer";link.download="rfq-attachment";link.click();
  });
  detail.append(button);
 }
}
async function restore(){
 try{
  const session=await api<{authenticated:boolean;csrf:string}>("/api/admin/session");
  csrf=session.csrf;await loadList();login.hidden=true;workspace.hidden=false;
 }catch{login.hidden=false;workspace.hidden=true;}
}
login.addEventListener("submit",async event=>{
 event.preventDefault();
 const fields=new FormData(login);
 alertText("Authenticating…");
 try{
  const result=await api<{csrf:string}>("/api/admin/login",{method:"POST",body:JSON.stringify({
   email:fields.get("email"),password:fields.get("password")})});
  csrf=result.csrf;
  await restore();if(workspace.hidden)throw Error("UNAUTHORIZED");
  (login.elements.namedItem("password") as HTMLInputElement).value="";
  alertText("Authenticated.");
 }catch{alertText("Access denied or authentication service unavailable.");}
});
filters.addEventListener("submit",e=>{e.preventDefault();loadList().catch(e=>alertText(String(e)));});
document.querySelector<HTMLButtonElement>("#admin-refresh")?.addEventListener("click",()=>loadList().catch(e=>alertText(String(e))));
document.querySelector<HTMLButtonElement>("#admin-notifications")?.addEventListener("click",async()=>{
 try{const r=await api<{sent:number;failed:number}>("/api/admin/notifications",{method:"POST"});alertText("Sent: "+r.sent+"; failed: "+r.failed);}
 catch(e){alertText(String(e));}
});
document.querySelector<HTMLButtonElement>("#admin-signout")?.addEventListener("click",async()=>{
 try{await api("/api/admin/logout",{method:"POST"});}catch{}
 csrf="";selected="";detail.replaceChildren();list.replaceChildren();workspace.hidden=true;login.hidden=false;
 alertText("Signed out.");
});
actions.addEventListener("submit",async event=>{
 event.preventDefault();if(!selected)return;
 const button=(event as SubmitEvent).submitter as HTMLButtonElement;
 const action=button?.value;if(!action)return;
 const fields=new FormData(actions),payload:Record<string,string|boolean>={action};
 for(const [k,v] of fields)if(typeof v==="string")payload[k]=v;
 payload.verified=fields.has("verified");
 button.disabled=true;
 try{
  await api("/api/admin/rfqs/"+encodeURIComponent(selected),{method:"PATCH",body:JSON.stringify(payload)});
  await Promise.all([loadDetail(selected),loadList()]);
  alertText("Action recorded.");
 }catch(e){alertText("Action rejected: "+String(e));}
 finally{button.disabled=false;}
});
void restore();
