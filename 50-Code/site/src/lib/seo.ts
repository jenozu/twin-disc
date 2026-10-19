/** SEO-03 policy boundary. SEO-02 owns the eventual canonical route map and publication schema. */
export const CANONICAL_ORIGIN = "https://twd.andel-vps.space";
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
  return env.VERCEL_ENV === "production" && env.SEO_APPROVED_FOR_INDEXING === "true";
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
  const host = new URL(origin);
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
  if (held || rel.PublishRule === "Hold" || HELD_SKUS.has(rel.SourceSKU.toUpperCase())) return "held";
  if (rel.PublishRule === "Yes" && (rel.Scope === "Exact" || rel.Scope === "Exact-equipment") && rel.SourceURL.startsWith("https://")) return "verified-exact";
  if (rel.PublishRule === "Family-only" && rel.Scope === "Family") return "family-only";
  if (rel.PublishRule === "Review") return "pending-review";
  return "unverified";
}
export function approvedSitemapPaths(
  routes: { path: string; publicationStatus?: string; held?: boolean }[],
  env: Record<string, string | undefined> = process.env,
): string[] {
  if (!isApprovedProduction(env)) return [];
  return [...new Set(routes.filter(r => !r.held && isApprovedStatus(r.publicationStatus)).map(r => canonicalPath(r.path)))].sort();
}
export function sitemapXml(paths: string[]): string {
  const entries = [...new Set(paths.map(path => canonicalUrl(path)))];
  return '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    entries.map(url => "  <url><loc>" + url.replace(/&/g, "&amp;") + "</loc></url>").join("\n") +
    "\n</urlset>\n";
}
