# Twin Disc Reseller & Customer Acquisition System — Master Roadmap

## Goal
Build a data-driven reseller business that uses approved SAP intelligence to choose products, publishes a focused Twin Disc catalogue, finds likely buyers based on equipment/application evidence, converts them through e-commerce/RFQ, purchases sold parts from MarIndustrial, and learns from actual sales.

## Phase 0 — Business & Data Foundation
- [ ] Define reseller relationship with MarIndustrial.
- [ ] Confirm reseller discount and whether it varies by item/manufacturer.
- [ ] Confirm permitted use of aggregated SAP sales history.
- [ ] Define warranty, returns, shipping, taxes, payment terms, drop-ship rules, and branding permissions.
- [ ] Keep MarIndustrial customer/confidential cost data out of the public repo.

Deliverable: `10-Strategy/Business Model.md`

## Phase 1 — SAP Product Intelligence
Primary objective: identify the first 20–50 products worth selling.

Run in order:
- [x] Query 00 — identify exact Twin Disc manufacturer record/FirmCode (44 Twin Disc, 45 Twin Disc - Anneson, 46 Twin Disc - Rockford).
- [x] Query 01 — top Twin Disc items, 5 years.
- [x] Query 02 — top Twin Disc items, 10 years.
- [x] Query 03 — top Twin Disc customers, 5 years.
- [x] Query 04 — top Twin Disc items, 12 months.
- [x] Query 05 — complete Twin Disc sales ledger, 10 years.
- [x] Query 06 — Twin Disc item master.
- [x] Query 07 — SAP price-list directory (List 1: A) Price List CAD selected for V1).
- [x] Query 08 — Twin Disc prices from selected list.

Why the windows:
- 12 months = current momentum.
- 5 years = primary demand signal.
- 10 years = installed-base/legacy replacement signal.

Initial product scoring (0–100):
- Demand: 0–20
- Recency: 0–20
- Customer breadth: 0–20
- Margin/economics: 0–20
- Prospectability/application clarity: 0–20

Grades:
- 85–100 A+
- 70–84 A
- 55–69 B
- 40–54 C
- <40 deprioritize

Deliverable: first 20–50 candidate SKUs.

## Phase 2 — Product Family Classification
Classify each candidate into PTO, PTO component, clutch, clutch component, transmission, transmission component, pump drive, ring gear, friction plate, bearing, seal, gear, housing, shaft, repair kit, or other.

Deliverable: normalized product master.

Progress: COMPLETE for the initial Launch 20. Batch 01 is stored in `40-Data/derived/phase2_product_master_batch01.csv`; Batch 02 is stored in `40-Data/derived/phase2_product_master_batch02.csv`. The sanitized launch set is stored in `40-Data/derived/launch20_public.csv`.

## Phase 3 — Equipment & Application Intelligence
For each priority SKU map: Twin Disc model, product family, equipment type, engine compatibility, power/torque range where available, applications, industries, OEM equipment, replacement components, related Twin Disc products, and documentation sources.

Deliverable: application database.

Progress: COMPLETE for the initial Launch 20. Research is stored in `90-Sources/product-research/phase3_application_intelligence_batch01.md` and `phase3_application_intelligence_batch02.md`. Compatibility claims follow the Exact / Family / Unverified evidence rules in `10-Strategy/Phase 2-3 Workflow.md`.

## Phase 4 — Product Relationship Database

Data foundation now available: SAP BOM/product-tree export (Query 11), SKU × customer relationships from the currency-safe sales ledger, WH01 stock, purchase-cost history, and open-PO data. Keep raw/customer/cost data local and out of the public repository.
Build assembly/component/application relationships such as Engine → PTO → driven equipment and Assembly → clutch/bearing/seal/ring gear.

Deliverable: product relationship graph/table.

Progress: COMPLETE for the Launch 20.

- Public relationship master: `40-Data/derived/phase4_product_relationships_public.csv`
- Coverage matrix: `40-Data/derived/phase4_relationship_coverage_public.csv`
- Relationship schema: `20-Architecture/Product Relationship Schema.md`
- Phase 5 drafting queue: `40-Data/derived/phase5_handoff_public.csv`
- Confidential SAP BOM/customer/cost relationships remain local and are not treated as public compatibility evidence.
- 18 of 20 launch products are ready for Phase 5 drafting.
- `SP211P304-TWD` and `SP111P340-TWD` remain on HOLD until their current Twin Disc service-replacement/order path is confirmed.

## Phase 5 — E-commerce Product Database
Fields: SKU, manufacturer, part number, title, description, family, application, compatible equipment/engines, retail price, reseller cost, web price, margin, weight/dimensions, stock/lead time, country of origin, images/docs, SEO terms, and publication status.

Progress: ACTIVE.

- Product database schema: `20-Architecture/Product Database Schema.md`
- Public Launch-20 catalog index: `40-Data/derived/phase5_product_catalog_index_public.csv`
- Product-copy Batch 01: `40-Data/derived/phase5_product_copy_batch01_public.csv`
- Research/copy notes: `90-Sources/product-research/phase5_product_copy_batch01.md`
- All 20 launch products now have structured Phase-5 records in the local workbook.
- 18 products are DRAFT; `SP211P304-TWD` and `SP111P340-TWD` remain HOLD.
- Batch 01 full page copy is complete for `SP211C006-TWD`, `SP318C003-TWD`, `CX110C005-TWD`, `A6518A-TWD`, and `6926E-TWD`.
- Public pricing mode remains RFQ until reseller terms are confirmed.
- Internal list price, cost scenarios, margin assumptions, and WH01 inventory remain local-only.

## Phase 6 — Website MVP
Required: search by part number, category/product pages, pricing/availability or RFQ, checkout/contact capture, shipping, order confirmation, and analytics.

## Phase 7 — Prospect Database
For each company: company, website, location, industry, equipment type/brand/model, engine, Twin Disc match, evidence, contacts, opportunity score, and status.

## Phase 8 — Prospect Scoring
- A+ confirmed Twin Disc equipment/product.
- A confirmed equipment/application strongly associated with a priority SKU.
- B correct industry/application but equipment unclear.
- C weak generic fit.

## Phase 9 — Outbound Acquisition
Use direct email, phone, LinkedIn, search, equipment directories, dealers, repair/rebuild shops, rental fleets, OEMs, paid search, and organic search. Outreach should reference specific equipment/part relevance rather than generic industrial supply language.

## Phase 10 — CRM
Statuses: NEW, RESEARCHED, QUALIFIED, CONTACTED, REPLIED, RFQ, QUOTED, ORDERED, LOST, FOLLOW_UP, DO_NOT_CONTACT.

Track first/last contact, next follow-up, product interest, quote/order value, gross profit, and source.

## Phase 11 — Order Workflow
Customer order/RFQ → verify price and MarIndustrial availability → collect payment/approval → purchase from MarIndustrial → receive/drop-ship → ship → tracking → close order.

Handle backorders, supersessions, wrong-part risk, international shipping/customs, warranties, and returns.

## Phase 12 — Sales Feedback Loop
Store product, customer industry, equipment, lead source, revenue, gross profit, time-to-close, and repeat-customer status. Use won/lost data to improve product and prospect scores.

## Phase 13 — Approved SAP Cross-Sell Analysis
Where permitted, identify product affinities and existing-account opportunities, e.g. buyers of engine family X who statistically resemble buyers of Twin Disc PTO Y but have never bought Y.

## Phase 14 — Dormant Demand
Find historically strong SKUs/customers that have gone quiet and legacy installed-base opportunities.

## Phase 15 — Automation & Dashboard
Automate local SAP-export ingestion, cleaning, aggregation, scoring, application mapping, product-candidate generation, and reporting.

Dashboard groups: products, prospects, and business economics.

## V1 Definition of Done
- [x] Manufacturer record confirmed.
- [x] 12-month, 5-year, and 10-year sales views produced.
- [x] Complete sales ledger and item master available locally.
- [x] Correct SAP price list identified for V1 analysis: List 1 (A) Price List CAD.
- [x] Top customer analysis complete.
- [x] First 20 product opportunities selected for the initial launch catalogue.
- [x] Product families and applications mapped for the Launch 20.
- [x] Margin and opportunity scoring working as a scenario model; actual reseller cost still requires MarIndustrial terms.
- [x] Product relationship database complete for the Launch 20, with evidence scope and publication rules.
- [x] Basic product database structure created with all Launch-20 records.
- [ ] Website live.
- [ ] Initial prospect database and CRM working.
- [ ] First real RFQ, sale, MarIndustrial purchase, and actual margin recorded.

## Current Next Action
Continue Phase 5 by drafting the remaining 13 DRAFT product pages in evidence-controlled batches. Keep `SP211P304-TWD` and `SP111P340-TWD` on HOLD. In parallel, collect the remaining checkout-readiness fields: approved reseller pricing rules, live availability method, weights/dimensions, country of origin, product images/rights, warranty/returns language, taxes, and shipping behavior. Once the next product-copy batches are complete, begin Phase 6 website MVP implementation from the Phase-5 catalog.

### Phase 1 analysis notes
- Manufacturer codes confirmed: 44 Twin Disc, 45 Twin Disc - Anneson, 46 Twin Disc - Rockford.
- Current item/pricing exports contain item records for 44 and 46; no item-master rows appeared for 45.
- Price List 1 (`A) Price List CAD`) is the V1 list-price reference.
- The V1 analysis rebuilds 12M/5Y/10Y item metrics from the raw invoice-line ledger by ItemCode so description changes do not split one SKU into multiple aggregate rows.
- MarIndustrial internal transactions are excluded from market-demand scoring.
- Supplemental Query 09 added document currency and Row Total (SC), allowing a common system-currency sales measure. Confirm the company's system currency before treating SC as CAD in final economics.
- Raw SAP customer, cost, inventory, purchasing, and open-PO data remains local and must not be committed to this public repository.


## Parallel Workstream — Organic Search, Technical Content and RFQ Acquisition (SEO)

This is **not a replacement or renumbering** of Phases 0–15. It is a cross-phase workstream supporting Phase 5 (approved product records), Phase 6 (website MVP), Phases 7–9 (prospecting/outbound), Phase 10 (CRM), and Phases 11–12 (order handling and learning).

- **Strategy/reference:** [SEO Audit & Growth Strategy](10-Strategy/SEO_AUDIT_AND_GROWTH_STRATEGY.md)
- **Detailed phased checklist:** [SEO Implementation Roadmap](70-Project-State/SEO_IMPLEMENTATION_ROADMAP.md)
- **Proposed page queue:** [SEO Page Backlog](70-Project-State/SEO_PAGE_BACKLOG.csv)
- **Workstream status:** strategy and task planning documented; implementation **NOT STARTED/NOT VERIFIED**.
- **Execution sequence:** SEO-00 commercial truth and permissions; SEO-01 verified site/keyword baseline; SEO-02 canonical architecture and source-safe schemas; SEO-03 crawlable templates; SEO-04 unknown-model RFQ; SEO-05 approved commercial catalog pages; SEO-06 industrial PTO/application guides; SEO-07 legacy marine gear research; SEO-08 honest Ontario region pages; SEO-09 launch QA and recurring measurement.
- **Existing assets to reuse:** Launch-20 sanitized data, five Phase-5 product copy drafts, Phase-4 relationship/publish rules and Phase 2–3 source hierarchy.
- **Critical holds:** SP211P304-TWD and SP111P340-TWD remain on HOLD until replacement/orderability verified.
- **Business gates:** no authorized-dealer claims, guaranteed repair/service availability, public inventory/prices, city offices or exact-fit substitutions without applicable evidence/approval.
- **Website repo/production boundary:** this planning repository may differ from the deployed website's source repository; identify the website repo and use isolated branches/previews. Do not merge/deploy without approval.


### SEO-00 / SEO-01 research execution checkpoint — 2026-10-19

- **SEO-00:** researched independent reseller/RFQ business model, seller/service permissions, 23 proposed claim verifications and replacements, Phase4 compatibility restrictions and technical editorial governance. **Business-owner/supplier permissions remain blocked.**
- **SEO-01:** reviewed actual Astro source at `50-Code/site/` on `feat/twd-ondine-editorial-rfq` and Vercel project/deployment records; documented **source-level** RFQ and public-claim risks. **No live production crawl or confirmed production URL**, rankings, keyword volumes, traffic or Core Web Vitals.
- **Research:** 137 search-intent candidate phrases; 43 proposed canonical mappings; 45 content briefs across legacy marine, industrial PTO, exact SKU, equipment applications and geographic pages; dated competitor and Ontario economic-source research.
- **Deliverables:** see `10-Strategy/SEO_00_BUSINESS_SCOPE_AND_CLAIMS.md`, `10-Strategy/SEO_01_CONTENT_GAP_ANALYSIS.md`, `70-Project-State/SEO_01_PRIORITIZED_RECOMMENDATIONS.md` and linked CSV evidence registers. Original SEO backlog entries preserved, additional candidate entries appended.
- **Next dependency:** confirm independent business identity, written supplier/resale & brand permissions, actual repair/service scope, who receives customer RFQs, legal/fulfillment terms, actual public canonical domain and Search Console/analytics access. **SEO-02 documentation design is permissible; not authorization for website changes or publication.**
- The earlier SEO workstream status “NOT STARTED/NOT VERIFIED” describes the state at creation of the original strategy; **this checkpoint is the later, authoritative research-progress update**. No existing project phases 0–15 are changed.


## SEO-03 implementation checkpoint — 2026-10-19

**Status: PARTIALLY IMPLEMENTED — verified preview; SEO-02 and human approvals pending.** The live Astro source is under `50-Code/site` on the Lumo feature branch, not on `main`. The SEO-03 website work uses separate `feat/twd-seo-phase-03` (source PR #7 against Lumo), and does not modify any production deployment or SEO-02 branch.

- Reusable Astro SEO head/canonical metadata, breadcrumbs/JSON-LD, specifications, identification, source references, evidence states, editorial status, related links, RFQ interface and typed search adapter added.
- Existing draft product/model paths remain preview-only: noindex and blocked preview robots. SEO sitemap is an approval-driven allowlist (currently zero unapproved URLs). No unsupported Product offers/availability/ratings or service organization claims added.
- HOLD `SP211P304-TWD` and `SP111P340-TWD` omitted from search and public routes; secondary `Review` research notes for SP314C002 and 6926E withheld pending stronger evidence.
- Vercel preview READY: https://twin-disc-git-feat-twd-seo-phase-03-jenozus-projects.vercel.app — deployed commit `1b4c2e9ddebc68eb08b821104676219204ae22c1`. Astro build: **32 HTML pages**. Node policy tests: **7 passed / 0 failed**. Build SEO validator: **passed 32 pages**, title/description/canonical/H1, JSON-LD, internal links, noindex, held routes and sitemap.
- No separately executed TypeScript/ESLint check, Lighthouse/CWV measurement, browser manual QA, approved production domain, SEO-02 architecture integration, or live RFQ backend yet. Vercel npm install reports 3 pre-existing dependency audit findings (low/high/critical); audit before public release.
- Awaiting SEO-02 route/schema/publication output, real reseller/service rights, verified technical sources, allowed branding/images, business identity and commercial permissions; RFQ backend is SEO-04, approved publication/content migration SEO-05.

Details: `50-Code/site/docs/seo/PHASE_03_INTEGRATION_CONTRACT.md` in SEO-03 feature branch. Full SEO-03 is **not complete**.
