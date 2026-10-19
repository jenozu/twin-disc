import { approvedSitemapPaths, sitemapXml } from "../lib/seo";
import { publicProducts } from "../data/products";
/** Draft product previews do not become published by virtue of being renderable. */
const candidates = [
  {path: "/", publicationStatus: "Draft"},
  {path: "/products", publicationStatus: "Draft"},
  {path: "/rfq", publicationStatus: "Draft"},
  ...publicProducts.map(p => ({ path: "/products/" + p.sku.toLowerCase(), publicationStatus: p.status === "DRAFT" ? "Draft" : "Held", held: p.status === "HOLD" })),
];
export function GET() {
  return new Response(sitemapXml(approvedSitemapPaths(candidates)), {
    headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=300" },
  });
}
