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

Progress: Batch 01 complete for the first 10 priority SKUs in `40-Data/derived/phase2_product_master_batch01.csv`.

## Phase 3 — Equipment & Application Intelligence
For each priority SKU map: Twin Disc model, product family, equipment type, engine compatibility, power/torque range where available, applications, industries, OEM equipment, replacement components, related Twin Disc products, and documentation sources.

Deliverable: application database.

Progress: Batch 01 application/OEM research complete in `90-Sources/product-research/phase3_application_intelligence_batch01.md`. Continue in 10-SKU batches using the evidence rules in `10-Strategy/Phase 2-3 Workflow.md`.

## Phase 4 — Product Relationship Database

Data foundation now available: SAP BOM/product-tree export (Query 11), SKU × customer relationships from the currency-safe sales ledger, WH01 stock, purchase-cost history, and open-PO data. Keep raw/customer/cost data local and out of the public repository.
Build assembly/component/application relationships such as Engine → PTO → driven equipment and Assembly → clutch/bearing/seal/ring gear.

Deliverable: product relationship graph/table.

## Phase 5 — E-commerce Product Database
Fields: SKU, manufacturer, part number, title, description, family, application, compatible equipment/engines, retail price, reseller cost, web price, margin, weight/dimensions, stock/lead time, country of origin, images/docs, SEO terms, and publication status.

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
- [ ] First 20–50 product opportunities selected. V2 enrichment is complete; shortlist narrowing is now active.
- [ ] Product families and applications mapped.
- [ ] Margin and opportunity scoring working.
- [ ] Basic product database and website live.
- [ ] Initial prospect database and CRM working.
- [ ] First real RFQ, sale, MarIndustrial purchase, and actual margin recorded.

## Current Next Action
Review the generated V1 product-opportunity analysis and validate the first 20–50 candidate SKUs. Before using revenue as a ranking input, add document currency (and ideally a system-currency line total) to the raw SAP sales ledger because the current revenue exports can mix CAD and USD.

### Phase 1 analysis notes
- Manufacturer codes confirmed: 44 Twin Disc, 45 Twin Disc - Anneson, 46 Twin Disc - Rockford.
- Current item/pricing exports contain item records for 44 and 46; no item-master rows appeared for 45.
- Price List 1 (`A) Price List CAD`) is the V1 list-price reference.
- The V1 analysis rebuilds 12M/5Y/10Y item metrics from the raw invoice-line ledger by ItemCode so description changes do not split one SKU into multiple aggregate rows.
- MarIndustrial internal transactions are excluded from market-demand scoring.
- Revenue is reference-only until currency-safe fields are added.
