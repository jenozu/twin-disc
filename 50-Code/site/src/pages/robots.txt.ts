import { CANONICAL_ORIGIN, isApprovedProduction } from "../lib/seo";
export function GET() {
  const enabled = isApprovedProduction();
  const body = enabled
    ? "User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /private/\n\nSitemap: " + CANONICAL_ORIGIN + "/sitemap.xml\n"
    : "User-agent: *\nDisallow: /\n";
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", ...(enabled ? {} : { "X-Robots-Tag": "noindex, nofollow" }) },
  });
}
