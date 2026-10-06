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

## Phase 6 — Website MVP & Technical SEO Build

### Goal
Turn the product intelligence and catalog data into a crawlable, conversion-focused Astro website that can rank for high-intent Twin Disc searches and turn visitors into fitment-safe RFQs.

**Live site:** `https://twd.andel-vps.space/`  
**Astro app:** `50-Code/site/`  
**Deployment branch:** `website-mvp`

### Build Order
Work through the following website phases in order. A later phase may be researched in parallel, but implementation should not bypass unfinished dependencies from the phase before it.

### Website Phase 1 — Structured SEO Foundation
- [x] Structured product database.
- [x] Preserve the existing Launch-20 SKU catalog while adding the model-level SEO catalog.
- [x] Existing SKU product URLs.
- [x] Individual model-level product URL generation implemented in the repo.
- [x] Technical SEO metadata per model.
- [x] Product JSON-LD schema.
- [x] FAQPage JSON-LD schema.
- [ ] Deploy and verify all model-level URLs return HTTP 200 on the VPS.
- [ ] Verify the production build contains both existing SKU pages and the 10 model-level SEO pages.
- [ ] Validate rendered Product and FAQ structured data after deployment.

**Phase 1 exit condition:** all model pages build successfully, render unique metadata/content, and are reachable on the live domain without breaking existing SKU pages.

### Website Phase 2 — Product Experience, Crawlability & Conversion
Complete in this order:

1. **Polished product page design**
   - [x] Model-page visual template implemented using the existing industrial design system.
   - [ ] Perform desktop and mobile visual QA on every model-page type.
   - [ ] Confirm long technical values, model names and tables wrap correctly.

2. **Model-specific RFQ workflow**
   - [ ] Build model-aware RFQ fields using each product's `quoteRequiredFields`.
   - [ ] Pre-fill model/part context when a visitor clicks Request Quote.
   - [ ] Preserve the existing generic RFQ path for visitors with incomplete identification.
   - [ ] Validate required/optional fields and RFQ confirmation behavior.

3. **Breadcrumbs**
   - [x] Model-page breadcrumbs implemented.
   - [ ] Add BreadcrumbList JSON-LD if useful after the visible hierarchy is finalized.

4. **Related-product modules**
   - [x] Related-product links/cards implemented from `relatedProducts`.
   - [ ] Verify every related ID resolves to a real page.
   - [ ] Expand relationships only where technically defensible.

5. **Category landing pages**
   - [ ] Marine Transmissions.
   - [ ] Power Take-Offs (PTOs).
   - [ ] Industrial Clutches.
   - [ ] Torque Converters.
   - [ ] Parts & Overhaul Kits.
   - [ ] Add useful category copy, product listings and internal links rather than thin index pages.

6. **XML sitemap**
   - [ ] Generate sitemap entries for the homepage, RFQ page, catalogue, category pages, SKU pages and model pages.
   - [ ] Exclude HOLD/non-public content.
   - [ ] Verify all sitemap URLs return HTTP 200.

7. **Canonical tags**
   - [x] Canonical URL support implemented in the shared layout.
   - [ ] Verify each production page self-canonicalizes to its final public URL.

8. **Open Graph metadata**
   - [x] Open Graph title, description, type and URL support implemented.
   - [ ] Add share images only when approved product/site imagery is available.

9. **On-page QA**
   - [ ] Confirm unique title, meta description and H1 on every model page.
   - [ ] Confirm no unsupported claims about authorization, stock, shipping, warranties or pricing.
   - [ ] Check accessibility, keyboard behavior, responsive layout and page performance.

**Phase 2 exit condition:** model pages are polished, internally discoverable, included in the sitemap, technically indexable, and capable of generating model-aware RFQs.

### Website Phase 3 — High-Intent SEO Expansion
Do not mass-produce these pages until the core product pages and internal-link structure in Phase 2 are stable.

1. **Parts-specific SEO pages**
   - [ ] Identify high-value model + parts intents from product/SAP intelligence.
   - [ ] Build pages only where enough unique technical and commercial information exists.
   - [ ] Examples: clutch packs, seal kits, bearings, filters, rebuild components and model-specific replacement parts.

2. **Rebuild / repair pages**
   - [ ] Create model-specific rebuild/overhaul intent pages where service/support is genuinely offered.
   - [ ] Cover failure symptoms, inspection scope, fitment data required and rebuild-vs-replace decision factors.
   - [ ] Avoid unsupported repair tolerances or procedures.

3. **Emergency replacement pages**
   - [ ] Create high-intent emergency replacement content for priority models.
   - [ ] Focus on identification, fitment verification, downtime reduction and RFQ readiness.
   - [ ] Never claim stock, same-day shipping or response times unless operationally verified.

4. **Model comparison pages**
   - [ ] Build comparisons only between models users genuinely cross-shop or replace.
   - [ ] Compare configuration, ratios, duty considerations, applications and identification requirements using verified data.
   - [ ] Link each comparison back to the corresponding model pages and RFQ workflow.

5. **Internal linking strategy**
   - [ ] Category → model pages.
   - [ ] Model → related model/parts pages.
   - [ ] Parts/rebuild/emergency pages → parent model.
   - [ ] Comparison pages → both compared models.
   - [ ] Catalogue/SKU pages → relevant model families where the relationship is supported.
   - [ ] Remove orphan pages before requesting indexing.

**Phase 3 exit condition:** the site has a deliberate topic cluster around priority Twin Disc products rather than disconnected or duplicate SEO pages.

### Website Phase 4 — Launch Validation & Search Operations
- [ ] `npm run build` completes with zero errors.
- [ ] Confirm expected static page count and inspect generated `dist/` paths.
- [ ] Spot-check production URLs with HTTP 200 responses.
- [ ] Validate canonical tags, robots behavior and sitemap.
- [ ] Validate JSON-LD with a structured-data testing tool.
- [ ] Connect/verify Google Search Console when ready.
- [ ] Submit the XML sitemap.
- [ ] Add privacy-safe analytics and RFQ conversion tracking.
- [ ] Record baseline impressions, clicks, indexed pages and RFQ conversions.
- [ ] Monitor crawl/indexing problems before expanding page volume.

### Website Definition of Done
- [ ] Existing SKU catalogue continues working.
- [ ] All approved model-level SEO pages are live and indexable.
- [ ] Category pages and sitemap are live.
- [ ] Canonical, Open Graph and structured data are verified in production.
- [ ] Model-aware RFQ flow works end-to-end.
- [ ] No orphan SEO pages.
- [ ] No unsupported engineering or commercial claims.
- [ ] Search Console and conversion measurement are operational.
- [ ] Phase 3 expansion pages are built only from validated demand and source-backed content.


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
- [x] Website live.
- [ ] Initial prospect database and CRM working.
- [ ] First real RFQ, sale, MarIndustrial purchase, and actual margin recorded.

## Current Next Action
Finish **Website Phase 1 deployment verification** first: pull the latest `website-mvp` commit to the VPS, run the Astro production build, confirm the 10 model-level SEO routes are generated, and verify representative live URLs return HTTP 200 without breaking existing SKU pages.

After Phase 1 is verified, continue **Website Phase 2 in order**:
1. visual QA of the model-page template,
2. model-specific RFQ workflow,
3. related-product integrity checks,
4. category landing pages,
5. XML sitemap,
6. production validation of canonicals/Open Graph/on-page SEO.

Continue the remaining Phase-5 SKU copy in evidence-controlled batches in parallel, but do not let unfinished SKU copy block the model-level technical SEO foundation.

### Phase 1 analysis notes
- Manufacturer codes confirmed: 44 Twin Disc, 45 Twin Disc - Anneson, 46 Twin Disc - Rockford.
- Current item/pricing exports contain item records for 44 and 46; no item-master rows appeared for 45.
- Price List 1 (`A) Price List CAD`) is the V1 list-price reference.
- The V1 analysis rebuilds 12M/5Y/10Y item metrics from the raw invoice-line ledger by ItemCode so description changes do not split one SKU into multiple aggregate rows.
- MarIndustrial internal transactions are excluded from market-demand scoring.
- Supplemental Query 09 added document currency and Row Total (SC), allowing a common system-currency sales measure. Confirm the company's system currency before treating SC as CAD in final economics.
- Raw SAP customer, cost, inventory, purchasing, and open-PO data remains local and must not be committed to this public repository.
