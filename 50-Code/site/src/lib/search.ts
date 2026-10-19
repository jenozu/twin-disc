/** Safe formatting search: punctuation normalizes identifiers but never establishes equipment fitment. */
import type { SearchableRecord } from "./seo.ts";
import { isHeldProduct } from "./seo.ts";
export type SearchMatchKind = "exact-part" | "model-family" | "related" | "review" | "no-match";
export interface SearchMatch { kind: SearchMatchKind; record?: SearchableRecord; message: string; }
export function normalizeIdentifier(input: string): string {
  return input.normalize("NFKC").toUpperCase().replace(/[^A-Z0-9]/g, "");
}
export function searchProducts(query: string, records: SearchableRecord[]): SearchMatch[] {
  const key = normalizeIdentifier(query);
  if (!key) return [{ kind: "no-match", message: "Enter a part or model number." }];
  const visible = records.filter(record => !isHeldProduct(record));
  const exact = visible.filter(record => [record.partNumber, record.sku].some(value => normalizeIdentifier(value) === key));
  if (exact.length) return exact.map(record => ({ kind: "exact-part" as const, record, message: "Exact documented part-number match. Equipment fitment remains unverified." }));
  const family = visible.filter(record => normalizeIdentifier(record.modelFamily).includes(key) || normalizeIdentifier(record.family) === key);
  if (family.length) return family.map(record => ({ kind: "model-family" as const, record, message: "Model-family context only; not a verified equipment-fit match." }));
  return [{ kind: "no-match", message: "No documented match. Use the identification request for an unknown model." }];
}
