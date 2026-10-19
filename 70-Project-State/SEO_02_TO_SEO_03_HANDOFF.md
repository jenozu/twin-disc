# SEO-02 to SEO-03 Integration Handoff

Prepared 2026-10-19. SEO-02 base: feat/twd-seo-phase-00-01. SEO-03 PR #7 head: feat/twd-seo-phase-03; its base is feat/twd-lumo-interactive-redesign. Both belong to jenozu/twin-disc but have distinct unmerged histories. DO NOT merge them blindly or change the other agent's branch under this task. Apply the approved data contracts in a separate SEO-03 development commit after owner review.

## Observed SEO-03 versus approved SEO-02 design
| Area | SEO-03 PR #7 currently | Exact remaining integration |
|---|---|---|
| Routes | 50-Code/site/src/pages/products/[sku].astro generates both SKU and model pages | Split into approved /parts/{part}/, /power-take-offs/{family}/ and /marine-transmissions/{model}/; add safe categories, resources, applications, conditional regions and solution routes |
| Canonical path | src/lib/seo.ts strips trailing slash; Astro preview configured trailingSlash never | SEO-02 registry uses trailing slash; unify Astro config, SEO helper, canonical output, redirects, links and sitemap around trailing slash always, or approve and propagate a formal amendment across entire SEO-02 registry first |
| Origin | twd.andel-vps.space is source-configured | Verify actual production canonical HTTPS host before any publication; staging remains noindex |
| Page visibility | src/lib/seo.ts global VERCEL_ENV plus SEO_APPROVED_FOR_INDEXING switch | Keep global kill switch AND enforce per-page Published, Phase5 status, current technical/commercial approval, source revision, rights and real claim gates |
| Evidence | relationshipState treats any Yes plus Exact/Exact-equipment plus HTTPS URL as verified-exact | Interpret RelationshipType and Scope together; MEMBER_OF never means installed machine fit; SERVICE_REPLACED_BY never proves orderable direct drop-in; require source row + human approval |
| Family-only | Existing relationshipState handles Scope Family alone | Preserve Family and Family/technical separately, with qualified wording; never exact equipment recommendations |
| Unverified relationships | CompatibilityInfo can show pending Review content in preview | Remove Review/No/Hold from public verified-fit text, links, SEO aliases, structured data, source-card marketing and search; internal researcher view stays separate |
| Search | src/lib/search.ts matches exact SKU/part number and family, not approved OEM aliases | Add exact OEM_CROSS_REFERENCE Yes/Exact lookup with claim IDs; ambiguous/HOLD returns human identification workflow, no automatic substitute |
| Product source | src/data/products.ts includes 18 DRAFT and two HOLD | Import existing Phase4 and Phase5 public CSV via lossless typed adapter; do not auto-promote DRAFT or publish held products |
| Structured data | WebPage/Breadcrumb available; model technical tables are preview research | Add truthful schema by approved type, source-qualified specs, Product without fake Offer/stock/reviews, technical article with proper reviewer, breadcrumbs matching visible nav |
| RFQ | RFQCTA points to /rfq, which prepares a local draft only | SEO-04 must add private working backend, consent and staffed response; never signal successful submission until server acknowledgement |
| Tests | PR #7 reported 7/7 unit tests and 32 generated preview pages with its own validator | Integrate SEO-02 11 templates, Draft2020 schema, Phase4/5 source checks, ten scenarios, link/canonical/redirect/index crawl checks before actual launch |

## Canonical taxonomy
Main categories: /products/, /products/power-take-offs/, /products/clutches/, /products/marine-transmissions/, /products/pump-drives/.
PTO hubs: /power-take-offs/sp111/, /sp211/, /sp314/, /sp318/, /cx107/, /cx108/, /cx110/ under the same root.
Marine legacy: /marine-transmissions/mg-506/ pending correct official revision and marine expert.
Exact public SKU: /parts/{lowercase-public-part-number}/, not /products/{sku} or independently indexable OEM aliases.
Guides: /resources/{topic}/. Applications: /industries/{application}/. Conditional genuine local coverage: /locations/ontario/ and approved regions. Unknown model solution: /solutions/twin-disc-pto-clutch-replacement/. Real submitted RFQ: /request-quote/ after SEO-04.
Only substantial approved 200 pages in sitemap. 58 candidate URLs are NOT yet authorized to publish. See 70-Project-State/SEO_02_PAGE_ARCHITECTURE.csv.

## Redirect inventory and cutover
See SEO_02_ROUTE_MIGRATION_MAP.csv. Old preview SKU /products/sp211c006 to new /parts/sp211c006/ may be 301 ONLY AFTER confirmed one-to-one part identity, published 200 target and observed old HTTP route. Apply likewise to sp318c003, cx110c005, a6518a, 6926e. Source route might include optional slash; one canonical after redirect, no chain. Preview model IDs must be inspected individually, not guessed from headings. /rfq cannot redirect to a nonexistent submitted workflow before SEO-04. No redirect for SP211P304 or SP111P340 into unconfirmed PX replacement references; these stay HOLD. Suppressed /services/ plans must not be generated.

## Data adapter and rendering contract
1. Use Phase4 relationship CSV plus Phase5 public catalog/copy CSV only; do not ingest private SAP exports or customer/stock/cost values.
2. Preserve SourceSKU, Scope, EvidenceLevel, PublishRule, RelationshipType and SourceURL and create stable sourceRowId and claimId. Join exact SKU identity without converting family references to equipment fit.
3. Yes + Exact with OEM_CROSS_REFERENCE is an OEM part-number reference only; Yes + Exact-equipment with USED_IN_EQUIPMENT is limited to named machine and variant; Family-only is contextual. Review, No, Hold not verified purchase or SEO alias. SP314C002 secondary OEM and 6926E secondary Bandit xrefs are Review. Both held old assemblies remain non-transactional.
4. Validate records against Templates/SEO/content-model.schema.json, required subtype extra fields in page-types.json and semantic source/authorization/freshness rules. examples.json is never an approved content source.
5. Generate a filtered public view model for body, metadata, JSON-LD, search and related links; reject unsourced specs, variant-less technical claims, false stock, warranty, same-day delivery, field repair and local technician assertions.
6. Build graph using link-rules.json and SEO_02_INTERNAL_LINKING_ARCHITECTURE.md. Family membership is not machine fit. Dedupe canonicals, cap related cards at six, suppress unpublished/HOLD targets, breadcrumbs match BreadcrumbList.
7. Add exact approved OEM search with uncertainty labels, approved model-family search and unknown-model fallback. No auto-match from superficial string similarity.
8. Site-wide origin + trailing slash normalization, one-hop 301s, sitemap, safe robots, visible/meta/schema parity, page-level index controls and source audits.
9. Perform Astro build, SEO-03 tests and rendered staging crawl for all resulting routes. Run the SEO-02 validation suite as a separate upstream gate.

## Ten required post-integration tests
01 exact SKU and source-backed OEM number, no implied equipment fit.
02 incomplete model/BOM/serial accepted by real SEO-04 workflow.
03 Family-only never becomes exact-fit card.
04 SP211P304 and SP111P340 absent from transactional/indexable pages, schema, search recommendations and redirects.
05 unique canonical URLs and validated one-hop legacy SKU redirects.
06 slipping symptom to safe model identification to documented family component (if identified) to honest RFQ.
07 Hamilton page suppressed without actual service territory, original local value and commercial review.
08 missing revision/units/technical approval and Review OEM references rejected from public claims.
09 new SKU can join public Phase4/5 records but stays Draft until approved.
10 revised manual or supersession invalidates dependent claim, link, schema and sitemap.

## Dependencies and ownership
Owner: actual domain, independent seller/dealer/brand terms, product sourcing and delivery, warranties and returns, image/document rights, authentic Ontario coverage and response staff.
Qualified technical reviewer: exact PTO/equipment claims, MG-506 variants and repair/safety guidance.
SEO-03 developer: source adapter, routes, components, metadata, redirects, indexing and rendered QA.
SEO-04 owner/developer: real private RFQ, consent, dedupe, manual triage and delivery tests.
SEO-02 documentation DOES NOT provide approvals or a deployment.

## Vercel branch mismatch
The SEO-02 Vercel check failed with NOW_SANDBOX_WORKER_ROOTDIR_NOT_EXIST because the documentation branch has no 50-Code/site. Do not copy the website here or change live Vercel settings to satisfy the check. A future owner-approved deployment rule can target only app-bearing branches or separate the docs CI from app deploys. GitHub Actions independent schema validation is the correct SEO-02 check.
