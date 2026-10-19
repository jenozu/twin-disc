/** Public-safe RFQ contract. Identification fields are deliberately optional. */
export const categories = ["pto","clutch","component","marine","unsure"] as const;
export const reasons = ["failed","worn","maintenance","upgrade","unknown"] as const;
export const conditions = ["out_of_service","operational","planned"] as const;
export const urgencies = ["asap","one_week","one_month","planning"] as const;
export const contactMethods = ["email","phone","either"] as const;
const optionalFields = [
  "description","model_number","serial_number","bom_number","part_number","oem_part_number",
  "equipment_manufacturer","equipment_model","equipment_type","engine","horsepower","rpm",
  "drive_arrangement","technical_notes","company","email","phone","postal_code","comments",
  "landing_page","source","medium","campaign","referrer","honeypot"
] as const;
export type RFQInput = Record<string,string|boolean>;
export type RFQResult = { ok:true; value:RFQInput } | { ok:false; errors:Record<string,string> };
function pick(v:unknown, max:number): string | null {
  if (v === undefined || v === null) return "";
  if (typeof v !== "string" || v.length>max) return null;
  return v.trim();
}
function isEmail(s:string){return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s) && s.length<=254;}
function isPhone(s:string){return /^[+()\d.\s-]{7,30}$/.test(s) && s.replace(/\D/g,"").length>=7;}
function choice(v:unknown, choices:readonly string[]):v is string{return typeof v==="string" && choices.includes(v);}
export function validateRFQ(raw:unknown):RFQResult {
  if (!raw || typeof raw!=="object" || Array.isArray(raw)) return {ok:false,errors:{form:"Invalid request."}};
  const input=raw as Record<string,unknown>;
  const errors:Record<string,string>={};
  const value:RFQInput={};
  for (const k of optionalFields) {
    const max=["description","technical_notes","comments"].includes(k)?2000: k==="referrer"||k==="landing_page"?300: 160;
    const val=pick(input[k],max);
    if(val===null) errors[k]="This field is too long or invalid.";
    else value[k]=val;
  }
  for(const [k,choices] of Object.entries({category:categories,reason:reasons,condition:conditions,urgency:urgencies,preferred_contact:contactMethods})){
    if(!choice(input[k],choices)) errors[k]="Select a valid option.";
    else value[k]=input[k] as string;
  }
  for(const k of ["name","city","province"]){
    const val=pick(input[k],100);
    if(!val) errors[k]="This field is required (maximum 100 characters).";
    else value[k]=val;
  }
  if(!value.email && !value.phone) errors.contact="Provide an email address or telephone number.";
  if(value.email && !isEmail(String(value.email))) errors.email="Enter a valid email address.";
  if(value.phone && !isPhone(String(value.phone))) errors.phone="Enter a valid telephone number.";
  if(value.preferred_contact==="email" && !value.email) errors.preferred_contact="An email address is needed for email contact.";
  if(value.preferred_contact==="phone" && !value.phone) errors.preferred_contact="A phone number is needed for telephone contact.";
  if(input.privacy_acknowledged!==true) errors.privacy_acknowledged="Privacy acknowledgment is required.";
  value.privacy_acknowledged=input.privacy_acknowledged===true;
  value.marketing_consent=input.marketing_consent===true;
  if(value.honeypot) errors.form="Unable to process this request.";
  if(value.horsepower && !/^\d{1,5}(\.\d{1,2})?$/.test(String(value.horsepower))) errors.horsepower="Use a numeric horsepower value.";
  if(value.rpm && !/^\d{1,5}$/.test(String(value.rpm))) errors.rpm="Use an integer RPM value.";
  return Object.keys(errors).length?{ok:false,errors}:{ok:true,value};
}
export function safeAttribution(p:RFQInput){
  const result:Record<string,string>={};
  for(const key of ["landing_page","source","medium","campaign","referrer"]){
    const v=String(p[key]||""); if(v) result[key]=v;
  }
  return result;
}
