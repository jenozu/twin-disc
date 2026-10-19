# SEO Implementation Roadmap — Twin Disc Ontario

**Workstream:** SEO / content architecture / organic RFQ acquisition  
**Date:** 2026-10-19  
**Status:** PLANNED — all checkboxes are pending unless explicitly described as existing repository assets  
**Strategic brief:** [SEO Audit & Growth Strategy](../10-Strategy/SEO_AUDIT_AND_GROWTH_STRATEGY.md)  
**Page queue:** [SEO Page Backlog](SEO_PAGE_BACKLOG.csv)  
**Overall project roadmap:** [MASTER_ROADMAP.md](../MASTER_ROADMAP.md)

> The SEO-00 to SEO-09 phases below are a **parallel implementation workstream**. They do not replace, restart or renumber the existing MASTER_ROADMAP Phase 0–15. Every change to product publishing must respect the existing Phase 4/5 evidence data and commercial gates.

## Execution conventions

- **[AI/DEV]** — can be drafted, coded, analyzed or tested by an AI coding agent, with review before external publication.
- **[HUMAN]** — explicit business owner, authorized supplier/technician, compliance or operational decision required; do not auto-complete.
- **[REVIEW]** — final QA or source check must be independently performed/approved before publication.
- **[DEPENDENCY]** — work can be prepared but cannot be truthfully activated before the stated gate.
- Checkbox **[ ]** indicates not confirmed complete. Existing source assets are noted separately; they do not imply this SEO task is completed.
- **Primary scope:** new SEO content/specification and customer acquisition. No direct production deployment or changes to website/main branches from this documentation workstream.

### Dependencies on the existing master roadmap

| SEO item | Existing project dependency |
|---|---|
| SEO source/product data | Phases 2–5 — classification, application intelligence, relationship graph and public-safe product records |
| Product pages + RFQ | Phase 5 evidence-approved copy and Phase 6 website MVP |
| Buyer and OEM application content | Phases 3, 7–9 — evidence-backed machine/application intel and prospects |
| RFQ operations, follow-up, revenue attribution | Phases 10–12 — CRM, order process, sales feedback |
| Reseller/service messaging and public prices | Phase 0 permissions and business model; Phase 11 operational terms |

### Milestone overview

| Phase | Purpose | High-level output | Gate |
|---|---|---|---|
| SEO-00 | Governance & business claims | Approved SEO operating boundaries | Human approval |
| SEO-01 | Baseline audit & keyword validation | Crawl, SERP research and keyword-to-page map | Verified data, not guesses |
| SEO-02 | Architecture & structured content | URL map, schemas, templates, evidence workflows | One canonical path per topic |
| SEO-03 | Technical SEO foundation | Crawlable, measurable website foundation | Crawl/index/UX QA |
| SEO-04 | Unknown-model RFQ & qualification | Production-ready RFQ, protected data and triage | Operational verification |
| SEO-05 | Product-led commercial launch | Approved categories, model hubs and SKU pages | Commercial/evidence clearance |
| SEO-06 | Industrial PTO + application content | Cluster B and C technical library | Qualified technical review |
| SEO-07 | Legacy marine transmission content | Cluster A MG-506 research and guides | New independent research |
| SEO-08 | Ontario local SEO & authority | Supported region pages and profiles | Genuine service/geographic claims |
| SEO-09 | Launch QA, analytics & iteration | Verified indexing, lead attribution, rolling backlog | Measured outcomes |

---

## SEO-00 — Scope, permission and commercial foundation
**Priority:** P0 | **Owner:** business owner + supplier contacts, assisted by AI/DEV  
**Entry:** repository and existing business roadmap available

- [ ] **SEO-00.1 [HUMAN] Define legal trading/website identity.**
  - [ ] Confirm entity name, domain, public contact details, returns entity and customer-facing brand.
  - [ ] Confirm dealer/distributor/reseller relationship, whether any endorsement/authorization wording is allowed.
  - [ ] Confirm use of Twin Disc names/logos, official drawings, PDF excerpts, part images and permitted brand assets.
- [ ] **SEO-00.2 [HUMAN] Confirm actual service and coverage capability.**
  - [ ] Decide parts sales/RFQ-only versus mechanical repair/overhaul/referral/field service.
  - [ ] Document genuine operating location(s), geographic scope and response channels.
  - [ ] Verify any promises about emergency availability, repair, shipping, stock or lead time.
  - [ ] Suppress or rewrite service/emergency pages if offerings cannot be delivered.
- [ ] **SEO-00.3 [HUMAN] Approve operational rules.**
  - [ ] Supplier pricing and availability verification route.
  - [ ] Warranty, returns, taxes, shipment, export and fulfillment rules.
  - [ ] Private customer RFQ data collection/consent and retention policy.
- [ ] **SEO-00.4 [AI/DEV] Prepare public claim register.**
  - [ ] Fields: claim, proposed page(s), evidence link, business owner, status and last-reviewed date.
  - [ ] Include authorized status, stocked availability, same-day service, service area, replacement compatibility, OEM fit and timelines.
  - [ ] Mark unsupported claims BLOCKED; provide truthful fallback wording.
- [ ] **SEO-00.5 [REVIEW] Preserve safety and data boundary.**
  - [ ] Verify that public GitHub contains no raw SAP reports, customer names, confidential prices/costs, internal inventory, supplier credentials or private BOM details.
  - [ ] Verify prohibited claims cannot reach public page build data without approval.

**Deliverables:** commercial-claims register (nonconfidential public version), approved scope/messaging and blocked claims list.  
**Exit / DoD:** service and dealer claims are either authorized and evidenced or explicitly omitted; owner has confirmed the RFQ business can actually respond.

## SEO-01 — Audit baseline, search intent and competition
**Priority:** P0 | **Owners:** AI/DEV research + HUMAN access/approval  
**Dependencies:** access to real website or staging URL and Search Console, if available

- [ ] **SEO-01.1 [HUMAN] Confirm correct production domain and website source repository.**
  - [ ] Record current platform, deployment method, staging/production separation and ownership.
  - [ ] Identify the correct website branch/repo (may be different from this research repository).
- [ ] **SEO-01.2 [AI/DEV] Crawl and inventory site.**
  - [ ] Export URL, status, indexability, canonical, title, H1, description, word count, internal links, schema and template.
  - [ ] Check robots.txt, sitemap(s), XML freshness, redirects, 404s/5xx, parameter URLs and orphan pages.
  - [ ] Check whether critical content exists in initial HTML and whether bots can reach rendered content.
  - [ ] Check desktop/mobile usability, broken quote CTAs, navigation and core flows.
- [ ] **SEO-01.3 [HUMAN] Verify Search Console and analytics access.**
  - [ ] Register/verify correct domain property if needed; submit sitemap after QA.
  - [ ] Record a baseline observation window without fabricating zeroes for unavailable history.
- [ ] **SEO-01.4 [AI/DEV] Validate keyword demand and intent.**
  - [ ] Search Canada/Ontario SERPs for emergency, problem, service and exact model/SKU terms.
  - [ ] Segment by industrial PTO/clutch versus marine transmission; annotate likely buyer state.
  - [ ] Evaluate actual SERP features, competing page types and available keyword-volume data.
  - [ ] Differentiate true service intent from informational diagnostic searches.
  - [ ] Incorporate OEM cross-reference and historical demand signals from public-safe launch research.
- [ ] **SEO-01.5 [AI/DEV] Build prioritized keyword-to-page map.**
  - [ ] One primary query intent per canonical page, plus supporting synonyms/variant spellings.
  - [ ] Deduplicate model, category and SKU search targets; identify pages not yet justified.
  - [ ] Add opportunity, confidence, source evidence, conversion CTA, status and dependencies.
- [ ] **SEO-01.6 [REVIEW] Verify audit claims.**
  - [ ] Distinguish observed technical issues from hypothesized SEO opportunities.
  - [ ] Record dated source links/screenshots and owner decisions for priorities.
  - [ ] Confirm baseline is reportable and repeatable.

**Deliverables:** dated technical crawl report, verified analytics/search baseline, competitor/SERP sheet, keyword-to-URL mapping.  
**Exit / DoD:** no unverified ranking, volume, traffic or technical error is represented as a fact; owner approves priority map.

## SEO-02 — Site hierarchy, evidence-driven content architecture
**Priority:** P0 | **Owners:** AI/DEV + [REVIEW] technical editor  
**Dependencies:** Phase SEO-01 keyword map; existing Phase 2–5 product records

- [ ] **SEO-02.1 [AI/DEV] Confirm canonical URL and navigation policy.**
  - [ ] Products: /products/ categories; distinct /parts/{part-number}/ SKU pages.
  - [ ] Family hubs: one canonical path (e.g. /power-take-offs/sp211/), not mirrored under /products/ without redirects/canonical management.
  - [ ] Technical library: /resources/; solution RFQ: /solutions/; real applications: /industries/; supported regions: /locations/.
  - [ ] Avoid generating indexable zero-content pages, faceted combinations and duplicate alternate slugs.
- [ ] **SEO-02.2 [AI/DEV] Design reusable content models.**
  - [ ] Category, model hub, comparison, identification, troubleshooting, maintenance, repair-vs-replace, product/SKU, application, Ontario location and RFQ solution.
  - [ ] Common fields: slug, title, description, H1, target intent, author, reviewer, review date, source revision, status, CTA and related IDs.
  - [ ] Technical-specific fields: spec+units, applicability, part relationship scope, evidence URL, PublishRule, unverified/hold warnings.
  - [ ] Distinguish editorial text from machine-readable fitment assertions.
- [ ] **SEO-02.3 [AI/DEV] Implement compatibility evidence pipeline.**
  - [ ] Reuse `Scope`, `EvidenceLevel`, `PublishRule`, and `SourceURL` from the existing Product Relationship Schema.
  - [ ] Gate exact compatibility claims behind PublishRule=Yes AND matching scope.
  - [ ] Display Family-only context without converting to exact fit; hide Review/No from assertive marketing language.
  - [ ] Prevent Hold products from order/quote recommendations until business review.
  - [ ] Add source/revision/expiry fields for safety-critical content and scheduled technical re-review.
- [ ] **SEO-02.4 [AI/DEV] Define internal-link graph.**
  - [ ] Every hub links to verified components, guides, related pages and RFQ.
  - [ ] Every product page links to parent family hub and relevant technical resource.
  - [ ] Every troubleshooting guide links to model identification and RFQ as an escape hatch.
  - [ ] Every application/location page links only to supported services/products.
  - [ ] Add breadcrumbs and related-content logic with anti-loop/dedup checks.
- [ ] **SEO-02.5 [REVIEW] Validate page-level content quality.**
  - [ ] Unique purpose and substance; no auto-generated city doorway or near-identical OEM variant pages.
  - [ ] Good technical citations, safe language, human-reviewed diagnostic detail, no model/spec guessing.
  - [ ] Permission check before reusing manuals, illustrations or screenshots.

**Deliverables:** canonical sitemap specification, 10 page schemas/templates, evidence-to-publication rules, link map.  
**Exit / DoD:** each target URL and template has a unique intent, source policy and conversion path.

## SEO-03 — Technical SEO and website template implementation
**Priority:** P0 | **Owner:** AI/DEV in the actual website repo  
**Dependencies:** SEO-00 scope, SEO-02 URL/template decisions

- [ ] **SEO-03.1 [AI/DEV] Prepare safe feature branch/staging deployment.**
  - [ ] Fetch latest website main; create feature branch; leave main/production unchanged pending approval.
  - [ ] Confirm framework, existing components, build/test commands and rollback approach.
  - [ ] If Astro selected, prerender or SSR critical catalog/resource pages; avoid JS-only essential content.
- [ ] **SEO-03.2 [AI/DEV] Build the template system.**
  - [ ] Global header/navigation, technical breadcrumbs, mobile menu and footer.
  - [ ] Product/category/model/resource/application/location layouts and RFQ CTA component.
  - [ ] Structured technical tables, source footnotes, revision/verification labels, part relationship cards.
  - [ ] Human-readable 404 and no-result search states with model identification escape hatch.
- [ ] **SEO-03.3 [AI/DEV] Implement SEO metadata.**
  - [ ] Unique titles, meta descriptions, canonical, robots, Open Graph and semantic headings.
  - [ ] Production sitemap.xml, robots.txt, redirects and broken-link detection.
  - [ ] Product and BreadcrumbList schema only where appropriate and eligible; Organization details verified.
  - [ ] Omit fake pricing/availability/reviews; avoid schema claiming unoffered service.
- [ ] **SEO-03.4 [AI/DEV] Implement product/OEM search.**
  - [ ] Normalize hyphens, spaces, case, common formatting variations and internal `-TWD` suffix mapping.
  - [ ] Allow Twin Disc part number, exact approved OEM cross-reference and family lookup.
  - [ ] Separate exact match, family candidate and unknown/unverified result states.
  - [ ] No recommendation/order action for HOLD or uncertain fitment.
- [ ] **SEO-03.5 [AI/DEV] Optimize mobile/performance/accessibility.**
  - [ ] Use appropriately licensed images with dimensions, alt text, lazy-loading and compression.
  - [ ] Fast/accessible forms, readable comparison tables, proper focus and error states.
  - [ ] Check real build outputs, Lighthouse/lab metrics and available CWV field reports.
- [ ] **SEO-03.6 [REVIEW] Prelaunch technical QA.**
  - [ ] Crawl staging, verify status/canonicals/sitemap/robots and mobile pages.
  - [ ] Manually follow conversion links and confirm technical claims are sourced.
  - [ ] Check production/noindex separation so staging does not compete with production.

**Deliverables:** production-ready site templates on an isolated branch, validated staging preview, technical SEO QA report.  
**Exit / DoD:** critical pages render for crawlers; no broken URLs, unsourced exact fitment or fake offers.

## SEO-04 — Unknown-model replacement RFQ and back-office workflow
**Priority:** P0 | **Owner:** AI/DEV + HUMAN operational reviewer  
**Dependencies:** SEO-00 business ops, SEO-02 data model, SEO-03 website templates

- [ ] **SEO-04.1 [AI/DEV] Implement conversion-focused page.**
  - [ ] /solutions/twin-disc-pto-clutch-replacement/ unique transactional copy, Ontario positioning, clear scope.
  - [ ] Primary "Find My Replacement" CTA and secondary manual contact method.
  - [ ] Show "model/serial/BOM unknown is acceptable" in hero and throughout flow.
  - [ ] Only show verified service and delivery promises.
- [ ] **SEO-04.2 [AI/DEV] Step 1 form — need & urgency.**
  - [ ] Complete PTO / clutch / component / not sure; reason; machine condition; preferred timeline.
  - [ ] Distinguish equipment down from operating but worn; avoid unsupported emergency response promises.
- [ ] **SEO-04.3 [AI/DEV] Step 2 — equipment data.**
  - [ ] Optional Twin Disc model, serial, BOM; never reject when unknown.
  - [ ] Machine make/model, engine, application, horsepower/RPM/drive arrangement, notes.
  - [ ] Safe photo upload guidance (do not remove guards or operate machine for photos).
  - [ ] Accept missing/partial identification and set NEEDS_IDENTIFICATION workflow.
- [ ] **SEO-04.4 [AI/DEV] Step 3 — contact and privacy.**
  - [ ] Contact name, at least one of phone/email, city, contact preference.
  - [ ] Explicit privacy acknowledgment; marketing consent separate/unselected.
  - [ ] File validation, rate-limiting/abuse protections, accessible error recovery.
- [ ] **SEO-04.5 [AI/DEV] Persist RFQ + workflow.**
  - [ ] Generate unique reference after successful database write; idempotency/dedup on retry.
  - [ ] Private file storage and scoped access; retention/deletion logic and audit trail.
  - [ ] State machine: NEEDS_IDENTIFICATION → FAMILY_IDENTIFIED → COMPATIBILITY_REVIEW → READY_TO_QUOTE, with AWAITING_INFORMATION / TECHNICAL_HOLD as explicit detours.
  - [ ] Track HIGH_URGENCY separately; urgency must never skip technical review.
  - [ ] Record evidence links and approval for exact fitment, price and stock/lead time.
  - [ ] Integrate with Phase 10 CRM and Phase 11 quotation/order workflow (or interim secure manual queue).
- [ ] **SEO-04.6 [HUMAN] Define who answers RFQs.**
  - [ ] Ownership, response process, source escalation, quote approval, privacy/contact process.
  - [ ] Confirm if supplier review is required for ambiguous models or superseded parts.
- [ ] **SEO-04.7 [REVIEW] Test scenarios.**
  - [ ] Unknown model, unknown serial, no photos — submission succeeds with sufficient contact and city.
  - [ ] Known exact SKU and documented match — still commercial availability checks.
  - [ ] Family-only relationship — no exact-fit recommendation.
  - [ ] HOLD product SP211P304/SP111P340 — technical hold, never auto-quotable.
  - [ ] Upload failure, invalid contact, double-click submit, server error and privacy consent denied.
  - [ ] Verify RFQ event tracking without leaking PII.

**Deliverables:** working RFQ wizard, secure database/triage, tested handoff process, customer confirmation page.  
**Exit / DoD:** real unknown-model test inquiry makes it end-to-end into a staffed, auditable next step.

## SEO-05 — Commercial product pages and initial search hub launch
**Priority:** P0 | **Owner:** AI/DEV + technical/editorial review  
**Dependencies:** Phase 5 product data, SEO-02/03, RFQ from SEO-04

- [ ] **SEO-05.1 [AI/DEV] Publish product and family category navigation.**
  - [ ] /products/ or equivalent top-level landing.
  - [ ] /products/power-take-offs/, /products/clutches/, /products/marine-transmissions/ as supported by approved content.
  - [ ] Make pricing RFQ-only until real commercial rules approved.
- [ ] **SEO-05.2 [AI/DEV] Build priority model hubs.**
  - [ ] SP211 hub using official/family-level sources; link documented service parts.
  - [ ] CX110 hub using verified official/distributor sources and variants.
  - [ ] Clearly differentiate family application text from exact machine/part fit.
- [ ] **SEO-05.3 [AI/DEV] Convert existing Phase 5 batch-01 research into pages.**
  - [ ] SP211C006 — exact SKU + approved OEM references.
  - [ ] SP318C003 — exact SKU + approved OEM references.
  - [ ] CX110C005 — exact SKU + approved Vermeer cross-reference.
  - [ ] A6518A — drive ring, supported SP314SB1/Beast 3680 evidence.
  - [ ] 6926E — drive ring, supported SP318SBO/Beast 3680 Track evidence.
  - [ ] Include source notes, related pages, disclaimers, RFQ CTA, unique metadata.
- [ ] **SEO-05.4 [AI/DEV] Finish remaining 13 draftable Phase 5 SKU copy items.**
  - [ ] Batch content creation from sanitized product index and evidence graph.
  - [ ] Check model/part descriptions, units, allowed cross references and images/rights.
  - [ ] Publish only when each SKU's review/operational gates are complete.
- [ ] **SEO-05.5 [HUMAN + REVIEW] Resolve the two HOLD assemblies.**
  - [ ] SP211P304-TWD current official replacement/service number and commercial order path.
  - [ ] SP111P340-TWD current official replacement/service number and commercial order path.
  - [ ] Until approved, no buy button, inventory claim or asserted exact replacement.
- [ ] **SEO-05.6 [AI/DEV] Verify cross-page links, search and conversion.**
  - [ ] Exact OEM search → appropriate sourced SKU.
  - [ ] Product → hub, hub → parts/guide, all → RFQ.
  - [ ] Search engine crawl/indexable content, correct canonical/metadata and no thin duplicates.
- [ ] **SEO-05.7 [REVIEW] Complete release audit.**
  - [ ] Compare published product content against source CSV and exact PublishRule.
  - [ ] Record each page's final publish approval and review date.

**Deliverables:** functional SKU hub/part RFQ funnel and first published approved product set.  
**Exit / DoD:** the five researched batch-01 pages and SP211/CX110 hubs are live only after correct evidence/commercial clearance.

## SEO-06 — Cluster B industrial PTO content and Cluster C applications
**Priority:** P1 | **Owner:** AI/DEV drafting + qualified technical review  
**Dependencies:** model hubs/product landing pages, factual source material, RFQ

- [ ] **SEO-06.1 [AI/DEV] Standardize technical content production.**
  - [ ] Templates for identification, comparison, maintenance, troubleshooting, parts guide, repair-vs-replace and application.
  - [ ] Research notes cite document URL, manufacturer, revision/date, model/BOM applicability and limits.
  - [ ] Author/reviewer metadata and review scheduling.
- [ ] **SEO-06.2 [AI/DEV] Publish identification content.**
  - [ ] General "How to identify a Twin Disc mechanical PTO" guide, including plate photo checklist.
  - [ ] SP211 identification guide (variants; no broad fit claims).
  - [ ] Internal CTA to unknown-model RFQ.
- [ ] **SEO-06.3 [AI/DEV] Publish problem-led resources.**
  - [ ] PTO clutch slipping — symptom guide, professional diagnosis boundary.
  - [ ] PTO overheating — known warning scenarios, safe shutdown recommendations tied to correct applicable docs.
  - [ ] Add other no-engagement/vibration topics only if demand and reliable technical documentation support them.
- [ ] **SEO-06.4 [AI/DEV] Develop comparison/parts guides.**
  - [ ] SP111 vs SP211 comparison based on sourced variant differences.
  - [ ] SP211 clutch/service components with verified Part # relationships.
  - [ ] Optional CX110 family variation guide when research ready.
- [ ] **SEO-06.5 [AI/DEV] Develop application guides.**
  - [ ] Wood chipper PTO identification and service parts.
  - [ ] Forestry/recycling grinders and equipment applications with exact/equipment-scoped facts.
  - [ ] Pumps and compressors (only source-backed family applications).
  - [ ] Add Bandit/Vermeer/Morbark/Terex OEM cross-reference references to canonical SKU pages, not duplicated marketing pages.
- [ ] **SEO-06.6 [REVIEW] Technical, copyright and internal linking QA.**
  - [ ] Subject-matter review of diagnosis/adjustment/maintenance language.
  - [ ] Confirm diagrams and photos have publication permissions.
  - [ ] Ensure each guide links to one canonical hub and RFQ, and avoids duplicate intent.

**Deliverables:** first substantive industrial technical cluster and the first application pages.  
**Exit / DoD:** sourced, differentiated, reviewed content that leads to model identification and relevant products.

## SEO-07 — Cluster A legacy marine transmission library
**Priority:** P1/P2 (research-first) | **Owner:** AI research + marine technical specialist  
**Dependencies:** source documents and independently confirmed commercial/service offering

- [ ] **SEO-07.1 [AI/DEV] Build marine gear document inventory.**
  - [ ] Official MG-506 family literature and manuals, correct edition/revisions.
  - [ ] MG-506-1 vs MG-506-A documented specifications, configurations and applicability.
  - [ ] Part-number/supersession and availability source ledger with evidence ratings.
- [ ] **SEO-07.2 [AI/DEV] Create /marine-transmissions/mg-506/ hub.**
  - [ ] Overview, variation warning, nameplate fields, supported specifications and related guides.
  - [ ] RFQ CTA without implying stocked MG-506 inventory.
- [ ] **SEO-07.3 [AI/DEV] Technical identification and comparison.**
  - [ ] Model/BOM/serial/ratio identification page with safe photo instructions.
  - [ ] MG-506-1 vs MG-506-A comparison table, original sources and units.
  - [ ] Explicitly separate comparative specs from interchangeability claims.
- [ ] **SEO-07.4 [AI/DEV] Maintenance, parts and replacement guidance.**
  - [ ] Maintenance page based on applicable official manual and qualified review.
  - [ ] Parts page with verified model-scoped service-part data.
  - [ ] Repair vs replace decision framework, without unsourced prices or advice to operate damaged gears.
  - [ ] Legacy replacement-options guide only after actual supersession/engineering validation.
- [ ] **SEO-07.5 [REVIEW] Marine engineering/editorial approval.**
  - [ ] Confirm manuals apply to specific variants and revisions.
  - [ ] Check ratios, oil values, operating limits and any inferred modern replacement path.
  - [ ] Remove implied "drop-in" equivalence until technically proven.

**Deliverables:** MG-506 hub, identification, variant comparison, maintenance, parts, repair-vs-replace and replacement evaluation pages as evidence permits.  
**Exit / DoD:** separate marine content cluster is accurate, distinct and commercially honest.

## SEO-08 — Ontario local pages, geographic reach and credibility
**Priority:** P1/P2 | **Owner:** AI/DEV + HUMAN coverage/business owner  
**Dependencies:** SEO-00 capabilities and SEO-01 validated local demand

- [ ] **SEO-08.1 [AI/DEV] Select page-worthy markets.**
  - [ ] Validate Hamilton/Burlington, Niagara/St. Catharines, Cambridge/Kitchener/Guelph and Oshawa/Durham first.
  - [ ] Validate Barrie/Orillia/Midland, Windsor/Essex and Thunder Bay second.
  - [ ] Record source evidence for industry use cases and real commercial fulfillment.
- [ ] **SEO-08.2 [HUMAN] Validate actual service/fulfillment boundaries.**
  - [ ] Which areas can receive parts, how shipping/lead times are estimated and whether onsite service/referral really exists.
  - [ ] Real address/telephone/business hours and other public identifiers.
- [ ] **SEO-08.3 [AI/DEV] Create a location-page template.**
  - [ ] Unique market/application detail, relevant service/products, real coverage facts, reference to nearby corridors.
  - [ ] Useful local FAQ or resources and direct RFQ routing.
  - [ ] Avoid copy-paste text and automated city/suburb page generation.
- [ ] **SEO-08.4 [REVIEW] Release first location pages.**
  - [ ] Manually review each for geographic accuracy, conversion links and content uniqueness.
  - [ ] No fictitious branches, staff, emergency guarantees or local street addresses.
  - [ ] Hold regions without enough evidence or distinctive utility.
- [ ] **SEO-08.5 [HUMAN + AI/DEV] Establish legitimate business signals.**
  - [ ] Claim eligible Google Business Profile if applicable; do not create duplicate/virtual-location profiles.
  - [ ] Ensure consistent public name/address/phone where genuine.
  - [ ] Seek relevant industry/OEM directory citations and lawful referral links; no paid link schemes.

**Deliverables:** useful, evidenced local pages and legitimate local-business signals.  
**Exit / DoD:** each released location page provides independent value and truthful coverage.

## SEO-09 — Measurement, QA, launch and continuous optimization
**Priority:** P0 for instrumentation; ongoing afterward | **Owner:** AI/DEV + HUMAN operations/marketing  
**Dependencies:** SEO-01 baseline, live reviewed pages and RFQ plumbing

- [ ] **SEO-09.1 [AI/DEV] Instrument conversions and search traffic.**
  - [ ] Analytics events: rfq_start, rfq_step_complete, rfq_submit, rfq_needs_identification, rfq_ready_to_quote, rfq_quoted, rfq_won.
  - [ ] Attribution: organic, exact SKU/OEM, problem, local and model-hub landing source without PII.
  - [ ] Integrate CRM stages and quote/order data subject to privacy/company permissions.
- [ ] **SEO-09.2 [AI/DEV] Technical launch gate.**
  - [ ] Check indexed URL list vs intended published pages and canonical/sitemap.
  - [ ] Run production crawl, mobile/performance tests, schema validation, source links, form/submission tests and security review.
  - [ ] Ensure unpublished/draft/HOLD/PII data is not discoverable.
- [ ] **SEO-09.3 [HUMAN] Validate real inquiry operations.**
  - [ ] Test an unknown-model customer inquiry end-to-end and confirm proper person receives it.
  - [ ] Test technical hold, source escalation, quote authorization and handling of unavailable parts.
- [ ] **SEO-09.4 [AI/DEV] Monthly reporting.**
  - [ ] Search Console clicks/impressions/indexed pages, segmented by intent/cluster.
  - [ ] Qualified RFQs, quote rate, conversion, lost reasons and sales results where measurable.
  - [ ] Broken/outdated content, query cannibalization, content freshness and top exit points.
  - [ ] Compare results to verified baseline; avoid guaranteeing rankings or lead counts.
- [ ] **SEO-09.5 [AI/DEV] Continuous iteration backlog.**
  - [ ] Refresh top product pages with verified new OEM sources, stock/quote process and user questions.
  - [ ] Add comparison/technical/region pages only from observed demand and demonstrated expertise.
  - [ ] Revalidate all major technical claim sources after manufacturer revisions.
  - [ ] Maintain a monthly prioritized list, responsible owner, status and evidence.

**Deliverables:** production QA sign-off, conversion dashboard, monthly SEO + RFQ performance review, improvement queue.  
**Exit / DoD:** the site demonstrably receives and processes inquiries, and SEO decisions are updated using actual outcomes.

---

## Minimum viable launch sequencing

The full workstream does **not** require every page to be live before the first customer inquiry. Follow this critical path:

1. SEO-00 commercial/claim gate for the pages being launched.
2. SEO-01 baseline and intent mapping (as much as is available before deployment).
3. SEO-02 canonical structure and safety/evidence data rules.
4. SEO-03 website templates and crawler readiness.
5. SEO-04 secure unknown-model RFQ capture and a real contact/quote handoff.
6. SEO-05 SP211/CX110 hubs and first five reviewed products.
7. SEO-09 launch QA and event tracking.
8. SEO-06/07/08 expand technical and geographic content after the first working funnel.

**Initial content release target:** 15 pages in [SEO Page Backlog](SEO_PAGE_BACKLOG.csv), adjusted according to source verification, commercial readiness, and measured intent.

### Minimum functional acceptance tests

- [ ] A customer with *unknown model, unknown BOM, unknown serial and no photos* can submit with valid contact details.
- [ ] RFQ is stored securely and routed to someone who can respond; confirmation includes an actual RFQ reference.
- [ ] Family-only relationships never generate exact-fit assertions.
- [ ] `SP211P304-TWD` and `SP111P340-TWD` remain blocked while on HOLD.
- [ ] Product titles/metas/canonicals/internal links are unique and crawlable.
- [ ] A natural search path exists from diagnosis → relevant model hub → supported SKU/RFQ.
- [ ] All public service, distributor, pricing and availability claims have documentary/operational support.
- [ ] Public site/repo has no internal SAP/customer/cost or private RFQ data.
- [ ] Technical content with safety implications receives qualified sign-off before publication.
- [ ] Analytics measures submitted and qualified RFQs, not only pageviews.

## Status and change management

- Update the checkbox for each completed task **only after checking the shipped artifact and acceptance test**.
- Keep `MASTER_ROADMAP.md` as the project-wide source of truth. Record top-level SEO milestone status there, and detailed work in this document.
- Store code and deployment actions in the **actual website repository** when identified. This strategy repository is the planning/evidence record.
- For any code change, use a feature branch and preview; request explicit approval before merge/deploy to production.
- Document changes to canonical URLs, service claims, source evidence and supersessions in the relevant technical/decision logs.
