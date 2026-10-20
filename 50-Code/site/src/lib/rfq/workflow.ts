/** High urgency is separate from compatibility evidence; no automatic approval. */
export const STATUSES = [
  "NEW","NEEDS_IDENTIFICATION","FAMILY_IDENTIFIED","COMPATIBILITY_REVIEW",
  "AWAITING_INFORMATION","TECHNICAL_HOLD","READY_TO_QUOTE","QUOTED",
  "FOLLOW_UP","WON","LOST","CLOSED"
] as const;
export type Status = typeof STATUSES[number];
export type PublishRule = "Yes"|"Family-only"|"Review"|"Hold"|"No";
export const HELD = new Set(["SP211P304-TWD","SP111P340-TWD"]);
const moves:Record<Status,readonly Status[]>={
  NEW:["NEEDS_IDENTIFICATION","FAMILY_IDENTIFIED","AWAITING_INFORMATION","COMPATIBILITY_REVIEW","TECHNICAL_HOLD","CLOSED"],
  NEEDS_IDENTIFICATION:["AWAITING_INFORMATION","FAMILY_IDENTIFIED","COMPATIBILITY_REVIEW","TECHNICAL_HOLD","CLOSED"],
  FAMILY_IDENTIFIED:["COMPATIBILITY_REVIEW","AWAITING_INFORMATION","TECHNICAL_HOLD","CLOSED"],
  COMPATIBILITY_REVIEW:["READY_TO_QUOTE","AWAITING_INFORMATION","TECHNICAL_HOLD","CLOSED"],
  AWAITING_INFORMATION:["NEEDS_IDENTIFICATION","FAMILY_IDENTIFIED","COMPATIBILITY_REVIEW","TECHNICAL_HOLD","CLOSED"],
  TECHNICAL_HOLD:["COMPATIBILITY_REVIEW","AWAITING_INFORMATION","CLOSED"],
  READY_TO_QUOTE:["QUOTED","COMPATIBILITY_REVIEW","TECHNICAL_HOLD","CLOSED"],
  QUOTED:["FOLLOW_UP","WON","LOST","COMPATIBILITY_REVIEW","CLOSED"],
  FOLLOW_UP:["QUOTED","WON","LOST","CLOSED"],
  WON:["CLOSED"], LOST:["FOLLOW_UP","CLOSED"], CLOSED:[]
};
export function isHeldPart(part:string):boolean{return HELD.has(part.trim().toUpperCase());}
export function initialStatus(p:{part_number?:string;model_number?:string;serial_number?:string;bom_number?:string}):Status {
  return p.part_number || p.model_number || p.serial_number || p.bom_number ? "NEW":"NEEDS_IDENTIFICATION";
}
export type ReviewEvidence={candidate_part:string;publish_rule:PublishRule;scope:string;verified:boolean;source_url:string;reviewer_id:string;reviewed_at:string};
export function canTransition(from:Status,to:Status,evidence:ReviewEvidence[]=[]):boolean{
  if(!moves[from]?.includes(to)) return false;
  if(to!=="READY_TO_QUOTE") return true;
  return evidence.some(r=> r.verified && r.publish_rule==="Yes" &&
    (r.scope==="Exact"||r.scope==="Exact-equipment") && r.source_url.startsWith("https://") &&
    !!r.reviewer_id && !!r.reviewed_at && !isHeldPart(r.candidate_part));
}
export function canVerifyCandidate(candidate:string,publishRule:PublishRule,scope:string,source:string):boolean {
  return !isHeldPart(candidate) && publishRule==="Yes" &&
    (scope==="Exact"||scope==="Exact-equipment") && source.startsWith("https://");
}
