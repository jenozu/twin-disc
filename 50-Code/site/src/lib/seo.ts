/** SEO-03 policy boundary. SEO-02 owns the eventual canonical route map and publication schema. */
/** Placeholder applies to preview only; live canonical domain requires explicit owner approval. */
export const PREVIEW_CANONICAL_PLACEHOLDER = "https://twd.andel-vps.space";
export function validateCanonicalOrigin(input: string): string {
  const url=new URL(input);
  if(url.protocol!=="https:"||url.pathname!=="/"||url.search||url.hash||url.username||url.password||url.port||
    url.hostname==="localhost"||url.hostname.endsWith(".vercel.app")||!url.hostname.includes("."))
      throw new Error("Invalid canonical production domain");
  return url.origin;
}
export const CANONICAL_ORIGIN=process.env.APPROVED_CANONICAL_ORIGIN
 ? validateCanonicalOrigin(process.env.APPROVED_CANONICAL_ORIGIN)
 : PREVIEW_CANONICAL_PLACEHOLDER;
export type PublicationStatus = "Draft" | "Awaiting technical verification" | "Awaiting business approval" | "Approved" | "Published" | "Held" | "Archived";
export type PublishRule = "Yes" | "Family-only" | "Review" | "Hold" | "No";
export type RelationshipScope = "Exact" | "Exact-equipment" | "Family" | string;
export interface EvidenceRelationship {
  SourceSKU: string;
  RelationshipType: string;
  Target: string;
  Scope: RelationshipScope;
  EvidenceLevel: string;
  PublishRule: PublishRule;
  SourceURL: string;
  Notes?: string;
  claimId?: string; sourceId?: string; documentRevision?: string|null;
  technicalReviewStatus?: "Pending"|"Approved"|"Rejected"|"NeedsRevalidation";
  approvedForPublication?: boolean; technicalReviewerId?: string|null;
  reviewedAt?: string|null; nextReviewAt?: string|null;
}
export interface SearchableRecord {
  sku: string;
  partNumber: string;
  title: string;
  modelFamily: string;
  family: string;
  status: "DRAFT" | "HOLD" | "Approved" | "Published";
}
export const HELD_SKUS = new Set(["SP211P304-TWD", "SP111P340-TWD"]);
export function isHeldProduct(p: Pick<SearchableRecord, "sku" | "status">): boolean {
  return p.status === "HOLD" || HELD_SKUS.has(p.sku.toUpperCase());
}
export function isApprovedStatus(status: string | undefined): boolean {
  return status === "Approved" || status === "Published";
}
/** Only an explicitly approved production build is indexable; neither preview nor local builds are. */
export function isApprovedProduction(env: Record<string, string | undefined> = process.env): boolean {
  return env.VERCEL_ENV==="production" && env.SEO_APPROVED_FOR_INDEXING==="true"
 && !!env.APPROVED_CANONICAL_ORIGIN
 && (()=>{try{return validateCanonicalOrigin(env.APPROVED_CANONICAL_ORIGIN!)===env.APPROVED_CANONICAL_ORIGIN}catch{return false}})();
}
export function mayIndexRecord(record: Pick<SearchableRecord, "sku" | "status">, env: Record<string, string | undefined> = process.env): boolean {
  return isApprovedProduction(env) && !isHeldProduct(record) && isApprovedStatus(record.status);
}
export function canonicalPath(pathname: string): string {
  if (!pathname.startsWith("/") || pathname.startsWith("//") || pathname.includes("\\")) throw new Error("Canonical path must be site-relative");
  const path = pathname.split(/[?#]/)[0].replace(/\/+/g, "/");
  if (path.includes("..")) throw new Error("Invalid canonical path");
  return path === "/" ? "/" : path.replace(/\/$/, "");
}
export function canonicalUrl(path: string, origin: string = CANONICAL_ORIGIN): string {
  const host = new URL(validateCanonicalOrigin(origin));
  if (host.protocol !== "https:" || host.username || host.password || host.search || host.hash || host.pathname !== "/") {
    throw new Error("Invalid canonical origin");
  }
  return new URL(canonicalPath(path), host).toString();
}
export function absoluteCanonical(urlOrPath: string): string {
  if (urlOrPath.startsWith("/")) return canonicalUrl(urlOrPath);
  const url = new URL(urlOrPath);
  if (url.origin !== CANONICAL_ORIGIN || url.search || url.hash) throw new Error("Canonical must use the approved origin");
  return canonicalUrl(url.pathname);
}
export function safeJsonLd(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
export function webpageSchema(title: string, description: string, path: string): Record<string, unknown> {
  return { "@context": "https://schema.org", "@type": "WebPage", name: title, description, url: canonicalUrl(path), inLanguage: "en-CA" };
}
export function breadcrumbSchema(items: { label: string; href: string }[]): Record<string, unknown> {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, i) => ({
    "@type": "ListItem", position: i + 1, name: item.label, item: canonicalUrl(item.href)
  })) };
}
export function relationshipState(rel: EvidenceRelationship, held = false):
  "held" | "verified-exact" | "family-only" | "pending-review" | "unverified" {
  if(held||rel.PublishRule==="Hold"||HELD_SKUS.has(rel.SourceSKU.toUpperCase()))return "held";
  if(rel.PublishRule==="Review")return "pending-review";
  const current=typeof rel.nextReviewAt==="string" && /^\\d{4}-\\d{2}-\\d{2}$/.test(rel.nextReviewAt)
    && rel.nextReviewAt>=new Date().toISOString().slice(0,10);
  if(!current||rel.technicalReviewStatus!=="Approved"||rel.approvedForPublication!==true||
    !rel.claimId||!rel.sourceId||!rel.documentRevision||!rel.technicalReviewerId||!rel.reviewedAt||
    !rel.SourceURL?.startsWith("https://"))return "unverified";
  if(["SERVICE_REPLACED_BY","SUPERSEDED_BY","POSSIBLE_COMPATIBILITY"].includes(rel.RelationshipType))return "unverified";
  if(rel.PublishRule==="Yes"&&(rel.Scope==="Exact"||rel.Scope==="Exact-equipment"))return "verified-exact";
  if(rel.PublishRule==="Family-only"&&(rel.Scope==="Family"||rel.Scope==="Family/technical"))return "family-only";
  return "unverified";
}
export function approvedSitemapPaths(
  routes: { path: string; publicationStatus?: string; held?: boolean; releaseApproved?: boolean }[],
  env: Record<string, string | undefined> = process.env,
): string[] {
  if (!isApprovedProduction(env)) return [];
  return [...new Set(routes.filter(r => !r.held && r.releaseApproved === true && r.publicationStatus === "Published").map(r => canonicalPath(r.path)))].sort();
}
export function sitemapXml(paths: string[]): string {
  const entries = [...new Set(paths.map(path => canonicalUrl(path)))];
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entries.map(url => "  <url><loc>" + url.replace(/&/g, "&amp;") + "</loc></url>").join("\n") +
    "\n</urlset>\n";
}
