import {
  SITE_URL,
  publicProducts,
  twinDiscProducts,
} from "../data/products";

const staticPaths = ["/", "/products/", "/rfq/"];

const skuPaths = publicProducts.map(
  (product) => `/products/${product.sku.toLowerCase()}/`,
);

const modelPaths = twinDiscProducts.map(
  (product) => `/products/${product.id}/`,
);

const urls = [...staticPaths, ...skuPaths, ...modelPaths];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (path) => `  <url>
    <loc>${SITE_URL}${path}</loc>
  </url>`,
  )
  .join("\n")}
</urlset>
`;

export function GET() {
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
