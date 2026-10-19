/**
 * SEO-03 adapter implementing SEO-02 design-only contract without promoting
 * any draft to an approved public page. Any future SEO-02 revision requires
 * a reviewed snapshot update, not a silent schema replacement.
 */
import type { SEOPage, CompatibilityEvidence, InternalLink, PublicationApproval, Phase4Relationship, Phase5PublicProduct, PublicationReadyFields } from "../contracts/seo02/content-model.types";
import pageTypes from "../contracts/seo02/page-types.json" with { type: "json" };
import { canonicalPath, HELD_SKUS } from "./seo.ts";
export type { SEOPage, CompatibilityEvidence, InternalLink };
export type RecordValidation = { valid: boolean; errors: string[] };
const schemaTypes = new Map(pageTypes.templates.map(x => [x.type, x]));
const legalStatuses = new Set(["Research","StructuredEvidence","AIDraft","AutomatedValidation","TechnicalReview","CommercialLegalReview","Approved","Published","NeedsRevalidation","Hold","Retired"]);
const exactScopes = new Set(["Exact","Exact-equipment"]);
const validISODate = (v: unknown) => typeof v === "string" && /^\d{4}-\d\d-\d\d$/.test(v) && !Number.isNaN(Date.parse(v+"T00:00:00Z"));
const today = () => new Date().toISOString().slice(0,10);
const enabledReview = (r:PublicationApproval|undefined) => !!r && [
 r.technicalApproved, r.commercialApproved, r.assetsApproved, r.identityApproved, r.privacyApproved
 ].every(x => x === true) && !!r.technicalReviewerId && !!r.commercialReviewerId
 && validISODate(r.nextReviewAt) && (r.nextReviewAt as string)>=today();

export function claimIsPublishable(c: CompatibilityEvidence): boolean {
 if (!c || c.approvedForPublication !== true || c.technicalReviewStatus !== "Approved") return false;
 if (c.PublishRule !== "Yes" && c.PublishRule !== "Family-only") return false;
 if (!c.claimId || !c.sourceId || !c.sourceRowId || !c.SourceURL?.startsWith("https://")) return false;
 if (!c.documentRevision || !c.technicalReviewerId || !validISODate(c.reviewedAt) || !validISODate(c.nextReviewAt) || (c.nextReviewAt as string)<today()) return false;
 if (HELD_SKUS.has(c.SourceSKU?.toUpperCase())) return false;
 if (c.PublishRule === "Family-only") return c.Scope === "Family" || c.Scope === "Family/technical";
 if (!exactScopes.has(c.Scope)) return false;
 if (c.RelationshipType === "USED_IN_EQUIPMENT" && c.Scope !== "Exact-equipment") return false;
 if (c.RelationshipType === "OEM_CROSS_REFERENCE" && c.Scope !== "Exact") return false;
 // A supersession/reference number never proves current direct interchange or sale.
 return c.RelationshipType !== "SERVICE_REPLACED_BY" && c.RelationshipType !== "SUPERSEDED_BY" && c.RelationshipType !== "POSSIBLE_COMPATIBILITY";
}
export function approvedOemAliases(claims: CompatibilityEvidence[], sku: string): string[] {
 return [...new Set(claims.filter(c=>c.SourceSKU.toUpperCase()===sku.toUpperCase()
  && c.RelationshipType==="OEM_CROSS_REFERENCE" && c.Scope==="Exact" && claimIsPublishable(c))
   .map(c=>c.Target))];
}
function validateRequiredFields(page:SEOPage, errors:string[]):void {
 const spec=schemaTypes.get(page.type);
 if(!spec){errors.push("Unrecognized template type");return}
 for (const field of spec.required) {
  const value = (page as unknown as Record<string, unknown>)[field] ?? page.extra?.[field];
  if (value===undefined || value===null || value==="" || (Array.isArray(value) && !value.length)) errors.push("Missing required "+field);
 }
}
export function validateSEOPage(input: unknown): RecordValidation {
 const e:string[]=[];
 if(!input || typeof input!=="object" || Array.isArray(input))return {valid:false,errors:["Page must be an object"]};
 const p=input as SEOPage;
 if(!/^[a-z][a-z0-9-]+$/.test(p.id??""))e.push("Invalid page ID");
 if(!schemaTypes.has(p.type))e.push("Invalid page type");
 if(!legalStatuses.has(p.status))e.push("Invalid status");
 if(typeof p.canonicalPath!=="string" || !/^\/[a-z0-9/-]*\/$/.test(p.canonicalPath) || p.canonicalPath.includes("//"))e.push("Invalid SEO-02 canonicalPath");
 if(typeof p.intent!=="string"||p.intent.length<8)e.push("Intent is required");
 if(typeof p.title!=="string"||p.title.length<10||p.title.length>90)e.push("Invalid title");
 if(typeof p.h1!=="string"||p.h1.length<8)e.push("Invalid H1");
 if(typeof p.metaDescription!=="string"||p.metaDescription.length<30||p.metaDescription.length>200)e.push("Invalid description");
 if(!Array.isArray(p.sections)||p.sections.length<2||p.sections.some(s=>typeof s!=="string"||!s.trim()))e.push("At least two nonempty sections required");
 if(!Array.isArray(p.sourceIds)||p.sourceIds.some(x=>typeof x!=="string"))e.push("Invalid source IDs");
 if(!Array.isArray(p.claims))e.push("Invalid claims array");
 if(!Array.isArray(p.links))e.push("Invalid links");
 if(!p.review||typeof p.review!=="object"||["technicalApproved","commercialApproved","assetsApproved","identityApproved","privacyApproved"].some(k=>typeof (p.review as unknown as Record<string,unknown>)[k]!=="boolean"))e.push("Invalid approval review fields");
 if(p.sku && HELD_SKUS.has(p.sku.toUpperCase()) && (p.status==="Published"||p.status==="Approved"))e.push("HOLD SKU cannot become Approved or Published");
 if(Array.isArray(p.links))for(const l of p.links)if(!l || typeof l.href!=="string"||!l.href.startsWith("/")||l.href.startsWith("//")||!l.anchor?.trim()||!Array.isArray(l.evidenceClaimIds))e.push("Invalid internal link");
 if(p.status==="Approved"||p.status==="Published"){
  const approved=p as SEOPage & Partial<PublicationReadyFields> & {contentHash?:string};
  if(!Array.isArray(p.sourceIds)||p.sourceIds.length===0)e.push("No evidence sources for approved page");
  if(p.extra?.illustrativeOnly!==false)e.push("Illustrative fixture cannot become Approved or Published");
  if(!approved.authorId?.trim()||!approved.sourceRevision?.trim()||!approved.primaryCta?.trim())e.push("Missing approved author, source revision or CTA");
  if(!validISODate(approved.lastVerifiedAt)||!validISODate(approved.nextReviewAt)||approved.nextReviewAt!<today())e.push("Missing or expired page review");
  if(!Array.isArray(approved.relatedIds))e.push("Missing reviewed related IDs");
  const r=p.review as PublicationApproval & {technicalReviewedAt?:string|null;commercialReviewedAt?:string|null};
  if(!enabledReview(r)||!validISODate(r.technicalReviewedAt)||!validISODate(r.commercialReviewedAt))e.push("Missing signed human review");
 }
 if(p.status!=="Research"&&p.status!=="AIDraft")validateRequiredFields(p,e);
 return {valid:e.length===0, errors:e};
}
export function validateContentBatch(pages: unknown[]): RecordValidation {
 const errors:string[]=[]; const paths=new Set<string>();const ids=new Set<string>();
 for(const [i,p] of pages.entries()){
  const v=validateSEOPage(p);
  errors.push(...v.errors.map(message=>"record "+i+": "+message));
  if(v.valid){const page=p as SEOPage; const normalized=canonicalPath(page.canonicalPath);
    if(paths.has(normalized))errors.push("Duplicate canonical path "+normalized);paths.add(normalized);
    if(ids.has(page.id))errors.push("Duplicate ID "+page.id);ids.add(page.id);
  }
 }
 return {valid:errors.length===0,errors};
}
export function mayPublishPage(page: SEOPage): boolean {
 if(!validateSEOPage(page).valid || page.status!=="Published" || !enabledReview(page.review)) return false;
 if(!(page as SEOPage & {contentHash?:string}).contentHash || !page.sourceIds.length || page.missingEvidence?.length) return false;
 if(page.sku && HELD_SKUS.has(page.sku.toUpperCase())) return false;
 if(page.claims.some(claim=>!claimIsPublishable(claim))) return false;
 if(page.type==="location") {
  if(!page.regionId || !page.extra?.approvedCoverageClaimId || !page.extra?.uniqueLocalValue) return false;
 }
 if(page.type==="rfq-solution" && page.extra?.operationalStatus!=="verified-working")return false;
 return true;
}
export function projectPublicLinks(page:SEOPage, allPages:SEOPage[]): InternalLink[] {
 const eligible=new Map(allPages.filter(mayPublishPage).map(p=>[canonicalPath(p.canonicalPath),p]));
 const out:InternalLink[]=[];const seen=new Set<string>();
 for(const link of page.links){
  let key:string;
  try{key=canonicalPath(link.href)}catch{continue}
  if(!eligible.has(key)||key===canonicalPath(page.canonicalPath)||seen.has(key))continue;
  // Replacement/supersession links cannot be signed off as drop-in fit from this evidence model.
  if(link.relation==="replacement")continue;
  if(link.relation==="exact-equipment-fit" && (link.evidenceClaimIds.length===0 ||
      !link.evidenceClaimIds.every(id=>page.claims.some(c=>c.claimId===id &&
        claimIsPublishable(c) && c.Scope==="Exact-equipment" && c.RelationshipType==="USED_IN_EQUIPMENT"))))continue;
  seen.add(key);out.push({...link,href:key});
  if(out.length>=6)break;
 }
 return out;
}
export function adaptPhase5Product(p: Phase5PublicProduct, edges: Phase4Relationship[]):
 {sku:string;partNumber:string;title:string;modelFamily:string;family:string;status:"DRAFT"|"HOLD"|"Approved"|"Published"} {
 if(!p.SKU?.trim()||!p.TwinDiscPartNumber?.trim()||!p.ProductTitle?.trim())throw new Error("Incomplete Phase5 record");
 return {sku:p.SKU,partNumber:p.TwinDiscPartNumber,title:p.ProductTitle,
 modelFamily:p.TwinDiscModelFamily??"", family:p.ProductFamily??"",
 status:HELD_SKUS.has(p.SKU.toUpperCase())||p.PublicationStatus==="Hold"?"HOLD":
  p.PublicationStatus==="Published"?"Published":p.PublicationStatus==="Approved"?"Approved":"DRAFT"};
}
