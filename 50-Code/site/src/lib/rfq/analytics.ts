/** Future SEO-09 instrumentation adapter: no free text, contact details or identifiers. */
const allowed=new Set([
  "rfq_start","rfq_step_complete","rfq_submit_success","rfq_submit_error",
  "rfq_needs_identification","rfq_ready_to_quote","rfq_quoted","rfq_won"
]);
const categories=new Set(["pto","clutch","component","marine","unsure"]);
export function safePublicAnalytics(event:string,context:Record<string,unknown>={}){
  if(!allowed.has(event))return null;
  const result:{event:string;step?:number;category?:string}={event};
  if(typeof context.step==="number"&&Number.isInteger(context.step)&&context.step>=1&&context.step<=3)result.step=context.step;
  if(typeof context.category==="string"&&categories.has(context.category))result.category=context.category;
  return result;
}
