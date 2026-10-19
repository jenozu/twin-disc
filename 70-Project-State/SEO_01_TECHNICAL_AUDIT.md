# SEO-01 — Technical Audit: Live Access vs Preview Source
**Audit performed:** 2026-10-19 | **Classification:** Vercel deployment metadata + GitHub **static code inspection**; **not** a completed live crawl.

## Site identity and deployments
| Finding | Status | Evidence |
|---|---|---|
| Source repo | VERIFIED: `jenozu/twin-disc` | Vercel project `twin-disc` GitHub metadata links owner `jenozu`, repo `twin-disc`. |
| Actual site code location | VERIFIED: `50-Code/site/`, on preview/experimental branches, e.g. `feat/twd-ondine-editorial-rfq` | GitHub compare `main...feat/twd-ondine-editorial-rfq` lists Astro sources. `main` has research/roadmap but no site package at root. |
| Framework | VERIFIED FOR PREVIEW SOURCE: Astro, static output | `50-Code/site/astro.config.mjs` (`output: static`, `trailingSlash: never`). |
| Hosting connection | VERIFIED: Vercel project ID `prj_0b2zWEPeQZ9DiRPEHqyucD8oweAF` | Vercel project reports framework `astro` and associated GitHub branch deployment metadata. |
| Configured canonical host in source | OBSERVED: `https://twd.andel-vps.space` | `50-Code/site/src/data/products.ts` constant `SITE_URL`. **Does not verify it is current live production.** |
| Vercel assigned domains | OBSERVED: `twin-disc-jenozus-projects.vercel.app`, `twin-disc-git-main-jenozus-projects.vercel.app` | Vercel project domain list. Neither is proof of successful public deployment. |
| Vercel production deployment | **NOT VERIFIED LIVE**: single returned production-target deployment was `CANCELED` at `main`, commit `44ea6451...` | Vercel `list_deployments(target=production)` on 2026-10-19. |
| Available experimental preview | VERIFIED AS DEPLOYMENT RECORD ONLY: `feat/twd-ondine-editorial-rfq` had `READY` deployments, e.g. `twin-disc-hskum7kbv-jenozus-projects.vercel.app` | Vercel deployment metadata; **not publicly crawled**. |
| Site accessibility | **BLOCKED**: public fetches of configured host, Vercel domains, `robots.txt`, `sitemap.xml` were inaccessible to external web audit. | Attempts on 2026-10-19. Vercel project indicates SSO protection enabled `all_except_custom_domains`; actual access error could not be definitively attributed. |

## Concrete code-level observations (NOT live-indexing claims)
**Source scope:** `feat/twd-ondine-editorial-rfq`. No code changed under this SEO research branch.

1. **RFQ does not submit** — `50-Code/site/README.md` says “No checkout, database or email dependency yet.” `src/pages/rfq.astro` intercepts submit and prepares a client-side copy/download summary; its own UI says “not submitted.” Therefore **no real qualified RFQ event or delivery can be assumed**. P0 conversion blocker for launch.
2. **Potential evidence-policy violation** — `src/data/products.ts` `productNotes` labels secondary SP314C002 Bandit/Morbark/Vermeer references and 6926E secondary Bandit references as “OEM cross references”; Phase 4 relationship CSV marks those `Review`. Explicit public assertion must be gated. **Potential publishing risk in code**, not independently tested in browser.
3. **Overclaim candidate** — `products.ts` includes MG-506 metadata “Rebuilds & Service” and text implying repair/overhaul support. Seller has not confirmed it can offer these services. Do not publish without scope approval.
4. **Canonical is optional** — `src/layouts/BaseLayout.astro` includes a canonical only when the caller passes `canonicalUrl`. Product route does; RFQ route uses `<BaseLayout title=...>` without one. Review all routes and resolve final domain.
5. **Robots/sitemap exist in source** — `src/pages/robots.txt.ts` allows crawling and references `SITE_URL`; `src/pages/sitemap.xml.ts` builds paths from `publicProducts` and model data. This confirms code intent, NOT deployed availability or validity. Sitemap uses trailing slashes whereas `astro.config.mjs` requests `trailingSlash: never`: **potential canonical mismatch**, require build + HTTP redirect checks.
6. **Static part and model routes overlap a single `/products/[sku]` template** — `getStaticPaths` emits `publicProducts` and `twinDiscProducts`; 18 DRAFT items are included, HOLD excluded. Planned SEO canonical hierarchy (`/parts/{part}/`, `/power-take-offs/{model}/`) is not implemented on this preview branch. A migration/redirect map is required before a new taxonomy ships.
7. **SKU meta titles may be weak for intent** — SKU route title is `partNumber + " | Powertrain Parts"`, despite richer source records with family/OEM terms. Unique but opportunity to show correctly verified part type in natural text; code-level observation.
8. **Onsite product search is client-side** — `src/pages/products/index.astro` filters pre-rendered product cards on input. This is usable when JS runs, but no source-backed OEM index integration or analytics was verified. Search on partial SKU/model is present in code; exact OEM search is not established by this implementation.
9. **Some structured data is generated** — `[sku].astro` constructs `buildProductSchema` and `buildFaqSchema` for *model pages*, not SKU branch. Eligibility/JSON validity/appropriateness untested. No evidence of fabricated review/price fields from the inspected template alone.
10. **Preview branding** — header/footer explicitly use independent “POWERTRAIN PARTS” rather than claiming official Twin Disc authorization; correctness of actual public trading name still pending.

## Audit checklist and evidence state
| Audit item | Outcome | Required verification |
|---|---|---|
| Production URL, DNS and HTTPS | UNVERIFIED | Confirm owner-selected production domain; check DNS/TLS, 200/301 chain |
| HTTP statuses, 3xx/4xx/5xx, orphan pages, broken links | NOT CRAWLED | Crawl verified accessible production/staging domain; export all responses |
| Robots.txt and XML sitemap | PRESENT IN PREVIEW SOURCE / LIVE UNVERIFIED | Fetch production HTTP response/status/content-type; enumerate indexable canonical URLs |
| Meta titles / descriptions / H1 / H2 | CODE-SPOT-CHECK ONLY | Crawl all output routes; detect duplicates/missing headings and boilerplate |
| Canonicals, redirects, trailing slashes | POTENTIAL RISK; NOT LIVE-VERIFIED | Compare `SITE_URL`, actual host, sitemap entries and canonical HTML |
| Indexability and Search Console indexed count | UNVERIFIED | Search Console Pages report, URL inspection on canonical production property |
| Internal links and model discovery | CODE-SPOT-CHECK ONLY | Rendered crawl and link-graph export; manually test all product/guide/RFQ paths |
| JavaScript rendering | Astro source static, **browser not audited** | Compare page source vs rendered DOM and JS-disabled essential content |
| Mobile UX / accessibility | UNVERIFIED | Lighthouse mobile/desktop and keyboard/form flow test on working host |
| Image optimization | UNVERIFIED | Audit dimensions, compression, LCP image, lazy loading, rights |
| Structured data | CODE GENERATORS OBSERVED / LIVE UNVERIFIED | Validate final rendered JSON-LD against page content and rich-result rules |
| CWV LCP/INP/CLS | NO MEASURED DATA | PageSpeed Insights/CrUX and Lighthouse lab on actual production domain |
| RFQ functioning | **NOT IMPLEMENTED IN INSPECTED PREVIEW** | Establish secure backend delivery; verify real submission, confirmation, spam/privacy |
| Product discoverability | 18 non-HOLD SKU paths generated IN SOURCE | Validate crawlable product HTML, indexability, OEM/variant query mapping |
| Duplicate content | UNVERIFIED | Crawl canonical model/SKU combinations and redirects with content fingerprinting |
| Competitor ranking/traffic | NOT MEASURED | Optional third-party licensed data; do not invent |
| Personal/analytics data | UNVERIFIED | Owner-authorized GSC/analytics settings and access |

## Exact next audit procedure — SEO-01 residual
1. Obtain *one confirmed controlled production host* and a publicly reachable/permissioned staging host; separately identify canonical production versus Vercel preview domains.
2. `curl -I` / headless HTTP test home, /products, /rfq, sample SKU, /robots.txt, /sitemap.xml across both hosts; save response codes, Location headers and final canonical.
3. Crawl with Screaming Frog/Sitebulb or Playwright script and export URL, HTTP status, robots/index, canonical, title, description, H1/H2, schema type, word count, inlinks/outlinks, image bytes/alt, redirects, internal 404s, duplicate hashes, orphan candidates (sitemap cross-check).
4. Compare **raw HTML** vs rendered DOM (without and with JS); test mobile UI, keyboard/tab order and quote flow.
5. Use PageSpeed Insights/CrUX for actual host and date; record CWV separately as field vs lab where available.
6. Access Search Console (owner approved), export 3-month / 16-month filters and URL inspection results, record search property and observation period.
7. Repeat after launch/migration; retain artifact filenames and run date; validate hold exclusions and Review claim suppression.

**Conclusion:** Code-review research delivered; **full production technical SEO audit is BLOCKED — ACCESS / DEPLOYMENT CONFIRMATION**. Do not equate missing data with zero traffic or zero indexed pages.
