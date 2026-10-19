# SEO-02 route integration checkpoint — staging

**Date:** 2026-10-19. **Source:** SEO-02 final handoff at `1532639bbe06fba99fbd270351d1229d982c7574` and PR #9.

## Decision: slash-terminated URLs
`Astro` uses `trailingSlash: always`. Canonical URL generation, breadcrumb and structured data share slash-terminated paths. Older prototype links are normalized during SEO-03 integration. All new example paths remain noindex until content receives validated technical and commercial approvals.

## Architecture integrated without publishing unsupported content
- One schema-driven Astro layout handles the **11 SEO-02 page types**; ten Research-only fixtures are rendered with non-indexation in staging.
- No location preview is generated for Hamilton because no actual service or local proof is established.
- Existing legacy `/products/{sku}-twd/` and `/products/twin-disc-{model}/` pages remain available as noindex prototypes, without speculative compatibility/fit.
- The sitemap remains empty until a real approved production origin and released content records exist.
- One-hop 301 redirects from the SEO-02 migration CSV remain **gated**: requires verified same-item intent, human approval, a 200 approved target and a crawled old route. No redirects for HOLD part supersession or the currently non-submitting `/rfq/` prototype.
- Unknown-model identification stays a preview only; secure operational RFQ belongs to SEO-04.

## QA follow-up
Verify an actual Astro build, scripted link/canonical/sitemap checks, staged HTTP redirect behavior and manual browser/device testing when Vercel SSO access is available.
