/** No external tracker. Custom events carry only a safe allowlist. */
const form=document.querySelector<HTMLFormElement>("#rfq04-form");
if(form){
  const steps=[...form.querySelectorAll<HTMLFieldSetElement>("[data-step]")];
  const next=document.querySelector<HTMLButtonElement>("#rfq04-next")!;
  const prev=document.querySelector<HTMLButtonElement>("#rfq04-prev")!;
  const submit=document.querySelector<HTMLButtonElement>("#rfq04-submit")!;
  const error=document.querySelector<HTMLElement>("#rfq04-error")!;
  const state=document.querySelector<HTMLElement>("#rfq04-state")!;
  const progress=document.querySelector<HTMLElement>("#rfq-progress-caption")!;
  const unknown=document.querySelector<HTMLInputElement>("#rfq-unknown-ids")!;
  const attachments=document.querySelector<HTMLInputElement>("#rfq-attachments")!;
  const part=document.querySelector<HTMLInputElement>("#rfq-part-number")!;
  const params=new URLSearchParams(location.search);
  const identifier=params.get("part");
  if(identifier && identifier.length<=160)part.value=identifier;
  let step=0,loading=false;
  let key=crypto.randomUUID();
  const analytics=(event:string,more:Record<string,string>={})=>{
    window.dispatchEvent(new CustomEvent("twd-analytics",{detail:{event,step:String(step+1),...more}}));
  };
  const setError=(message:string)=>{
    error.textContent=message;error.hidden=!message;
    if(message)error.scrollIntoView({behavior:"smooth",block:"nearest"});
  };
  const show=(n:number)=>{
    step=n;
    steps.forEach((s,i)=>s.hidden=i!==step);
    document.querySelectorAll("[data-progress]").forEach((li,i)=>{
      li.classList.toggle("is-current",i===step);
      li.classList.toggle("is-complete",i<step);
      if(i===step)li.setAttribute("aria-current","step");else li.removeAttribute("aria-current");
    });
    progress.textContent="Step "+(step+1)+" of 3";
    prev.hidden=step===0;next.hidden=step===2;submit.hidden=step!==2;
    setError("");
  };
  const validateStep=()=>{
    for(const field of steps[step].querySelectorAll<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>("input,select,textarea")){
      if(field.disabled||field.type==="file"||field.name==="honeypot")continue;
      if(!field.checkValidity()){field.reportValidity();field.focus();return false;}
    }
    if(step===1){
      const files=[...(attachments.files||[])];
      if(files.length>3||files.some(f=>f.size===0||f.size>1_000_000||
        !["image/jpeg","image/png","application/pdf"].includes(f.type))){
        setError("Select up to three JPEG, PNG or PDF files of no more than 1 MB each.");attachments.focus();return false;
      }
    }
    if(step===2){
      const email=form.elements.namedItem("email") as HTMLInputElement;
      const phone=form.elements.namedItem("phone") as HTMLInputElement;
      const preferred=form.elements.namedItem("preferred_contact") as HTMLSelectElement;
      if(!email.value.trim()&&!phone.value.trim()){setError("Provide an email address or telephone number.");email.focus();return false;}
      if(preferred.value==="email"&&!email.value.trim()){setError("Enter an email address for email contact.");email.focus();return false;}
      if(preferred.value==="phone"&&!phone.value.trim()){setError("Enter a telephone number for phone contact.");phone.focus();return false;}
    }
    return true;
  };
  next.addEventListener("click",()=>{
    if(!validateStep())return;
    analytics("rfq_step_complete");
    show(Math.min(step+1,2));
    form.querySelector<HTMLElement>("fieldset:not([hidden]) legend")?.focus();
  });
  prev.addEventListener("click",()=>show(Math.max(step-1,0)));
  unknown.addEventListener("change",()=>{
    form.querySelectorAll<HTMLInputElement>("[data-identifier]").forEach(input=>input.disabled=unknown.checked);
    document.querySelector<HTMLElement>("#rfq-unknown-help")!.hidden=!unknown.checked;
  });
  attachments.addEventListener("change",()=>{
    const files=[...(attachments.files||[])];
    document.querySelector<HTMLElement>("#rfq-file-message")!.textContent=
      files.length?files.length+" file(s) selected; upload occurs only when you submit.":"";
  });
  form.addEventListener("submit",async(event)=>{
    event.preventDefault();
    if(loading||!validateStep())return;
    loading=true;submit.disabled=true;prev.disabled=true;state.textContent="Submitting securely…";setError("");
    const formData=new FormData(form);
    const payload:Record<string,string|boolean>={};
    for(const [k,v] of formData.entries())if(k!=="attachments"&&
      k!=="privacy_acknowledged"&&k!=="marketing_consent"&&typeof v==="string")payload[k]=v;
    payload.privacy_acknowledged=(form.elements.namedItem("privacy_acknowledged") as HTMLInputElement).checked;
    payload.marketing_consent=(form.elements.namedItem("marketing_consent") as HTMLInputElement).checked;
    payload.landing_page=(document.referrer||"").slice(0,300);
    payload.referrer=(document.referrer||"").slice(0,300);
    for(const k of ["source","medium","campaign"]){
      const v=params.get("utm_"+k);if(v)payload[k]=v.slice(0,160);
    }
    const body=new FormData();
    body.set("payload",JSON.stringify(payload));
    body.set("idempotency_key",key);
    for(const file of [...(attachments.files||[])])body.append("attachments",file,file.name);
    try{
      const response=await fetch("/api/rfq",{method:"POST",body,headers:{"accept":"application/json"},credentials:"omit"});
      const result=await response.json();
      if(!response.ok||!result.accepted){
        if(result.fields){const first=Object.values(result.fields)[0];throw new Error(String(first));}
        if(result.error==="SUBMISSION_NOT_CONFIGURED")throw new Error("Secure submission is not yet available. Please try again once the inquiry service is enabled.");
        if(result.error==="TOO_MANY_REQUESTS")throw new Error("Too many inquiries have been submitted. Try again later.");
        throw new Error("Your inquiry was not confirmed. No success has been recorded. Please retry.");
      }
      analytics("rfq_submit_success",{category:String(payload.category||""),source:String(payload.source||"").slice(0,60)});
      if(result.status==="NEEDS_IDENTIFICATION")analytics("rfq_needs_identification");
      document.querySelector<HTMLElement>("#rfq04-reference")!.textContent=result.reference;
      if(result.attachmentFailures){
        document.querySelector<HTMLElement>("#rfq04-success-message")!.textContent=
          "Your inquiry was stored, but "+result.attachmentFailures+" attachment(s) could not be saved. Mention your reference when following up.";
      }
      form.hidden=true;document.querySelector<HTMLElement>(".rfq04-progress")!.hidden=true;
      const success=document.querySelector<HTMLElement>("#rfq04-success")!;
      success.hidden=false;success.focus();
    }catch(e){
      analytics("rfq_submit_error",{step:"3"});
      setError(e instanceof Error?e.message:"Submission was unsuccessful.");
    }finally{loading=false;submit.disabled=false;prev.disabled=false;state.textContent="";}
  });
  show(0);analytics("rfq_start");
}
