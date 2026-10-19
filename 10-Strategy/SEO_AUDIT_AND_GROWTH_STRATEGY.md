# Twin Disc Ontario — SEO Audit & Growth Strategy

**Status:** Strategic audit and implementation reference (not a completed live-site crawl)  
**Version:** 1.0 — 2026-10-19  
**Project:** Twin Disc reseller and customer-acquisition platform, Ontario, Canada  
**Companion execution plan:** [SEO Implementation Roadmap](../70-Project-State/SEO_IMPLEMENTATION_ROADMAP.md)  
**Master source of truth:** [MASTER_ROADMAP.md](../MASTER_ROADMAP.md)

## 1. Purpose, baseline, and research boundaries

Build a technically credible, Ontario-focused Twin Disc parts and inquiry platform that earns organic visibility from people searching by **problem, service requirement, exact model/SKU/OEM number, or equipment application**. The commercial goal is **qualified parts/replacement/service inquiries** rather than visits alone.

**Audit classification:** strategic opportunity assessment based on prior SEO research, the repository's published-safe Launch-20 records, and the proposed site structure. The production site's live crawl, Search Console performance, current organic traffic, keyword volumes, rankings, indexing status, and Core Web Vitals have **not** been verified in this document. Complete Phase SEO-01 before reporting these as facts. Keyword priorities are judgments about commercial intent and current project fit—not measured Canadian search volumes or competition values.

**Baseline from this repository (reviewed 2026-10-19):**
- [MASTER_ROADMAP.md](../MASTER_ROADMAP.md): Phase 5 product database/copy active; website MVP planned under existing Phase 6.
- [Public Launch-20 catalog](../40-Data/derived/phase5_product_catalog_index_public.csv): 20 structured product records; 18 DRAFT, 2 HOLD.
- [Product copy batch 01](../40-Data/derived/phase5_product_copy_batch01_public.csv): SP211C006, SP318C003, CX110C005, A6518A, 6926E have researched page copy.
- [Product relationship schema](../20-Architecture/Product%20Relationship%20Schema.md): source-backed relationship types, evidence scope and publish rules.
- [Product database schema](../20-Architecture/Product%20Database%20Schema.md): public/private field separation and RFQ-first pricing.

**Not yet confirmed and therefore not to be claimed:** authorized-distributor/dealer status, manufacturer endorsement, stocked product quantities, online checkout eligibility, physical workshop or field-service capability, emergency/24-hour coverage, local branches, guaranteed shipping times, confirmed substitutions, or model-specific repair prices. Human approval is needed for supplier arrangements, business identity, warranty/returns, trademarks, images, relevant safety instructions and service promises.

## 2. Market positioning and buyer jobs-to-be-done

**Working positioning:** "Twin Disc industrial PTO, clutch, and marine transmission parts, identification help, and replacement inquiries for Ontario customers."

Use exact truthful business wording once commercial permissions are confirmed. If repairs are not offered directly, describe the process as a *repair inquiry/referral or parts assessment*, not an onsite repair service. Avoid claiming "authorized Twin Disc distributor" until approved.

**Buyer segments:**
1. Maintenance supervisors and fleet managers with downtime-sensitive equipment.
2. Mechanics and service technicians who need model identification and cross-reference support.
3. Purchasing teams searching an exact Twin Disc or machine-OEM number.
4. Owners of marine vessels/industrial machinery with legacy, damaged or unreadable nameplates.
5. OEM repair shops, forestry/recycling equipment operators, pump/compressor users and relevant marine operators.

**Conversion actions:** exact-part RFQ; unknown-model identification RFQ; technical support inquiry; verified product request; qualified service/repair request *only when actually supported*. Measure downstream quote, sale and lost-reason data.

## 3. Intent-based keyword strategy

Candidate phrases need validation in Google Search Console, SEO research tools, customer conversations and SERP review. Create one primary page per distinct user intent, not one page per spelling variant.

| Bucket | Candidate query / query group | Intent | Planned landing page | Priority |
|---|---|---|---|---|
| Emergency | twin disc emergency repair ontario; twin disc clutch slipping urgent repair | Urgent resolution | /services/urgent-repair/ (conditional on capability) | High if service is real |
| Emergency | marine gearbox lost propulsion; marine transmission not engaging forward | Downtime/diagnosis | /resources/marine-transmission-not-engaging/ | High |
| Emergency | pto failure repair near me; wood chipper PTO failed | Downtime | /solutions/twin-disc-pto-clutch-replacement/ | High |
| Problem | twin disc pto overheating; pto clutch won't engage | Troubleshoot | /resources/pto-overheating/ and /resources/pto-clutch-not-engaging/ | High |
| Problem | twin disc clutch slipping; pto vibration under load | Troubleshoot/replace | /resources/pto-clutch-slipping/ | High |
| Problem | twin disc marine gear low oil pressure; gearbox overheating | Diagnostic inquiry | /resources/marine-gear-low-oil-pressure/ | High |
| Service | twin disc transmission repair ontario; marine gear overhaul ontario | Provider | /services/marine-transmission-repair/ | High if capability verified |
| Service | twin disc PTO repair Canada; industrial PTO replacement Ontario | Service or parts | /services/pto-clutch-repair/ or replacement RFQ | High |
| Service | clutch rebuild; PTO clutch inspection | Provider | /services/pto-clutch-repair/ | Medium if offered |
| Product | twin disc MG-506 parts; MG-506-1 vs MG-506-A | Legacy/model research | /marine-transmissions/mg-506/ | High strategic; new research needed |
| Product | twin disc SP211 parts; SP211 clutch assembly | Parts | /power-take-offs/sp211/ | High |
| Product | SP211C006; Bandit 900-6943-78 | Exact SKU/OEM lookup | /parts/sp211c006/ | High |
| Product | SP318C003; Vermeer 154820001; Bandit 900-6914-08 | Exact SKU/OEM lookup | /parts/sp318c003/ | High |
| Product | CX110C005; Vermeer 603643003 | Exact SKU/OEM lookup | /parts/cx110c005/ | High |
| Product | A6518A drive ring; 6926E drive ring | Exact SKU | /parts/a6518a/ and /parts/6926e/ | High |
| Product | CX110P315 PTO; CX108P405; CX107P405 | Complete assembly | /parts/{verified-sku}/ | Medium–High |
| Replacement | twin disc PTO replacement unknown model; obsolete PTO replacement | Assisted identification | /solutions/twin-disc-pto-clutch-replacement/ | High |

**Search behavior:** exact part/OEM number searches often suggest advanced purchase intent; problem searches need an answer and a relevant next step; service searches need proof of capability; legacy queries need identification and replacement-evaluation help. A generic blog feed is not the primary strategy.

## 4. Content gaps to own

1. **Unknown model and unreadable plate:** photos, serial/BOM identification, equipment make/model, staged RFQ, no forced part guessing.
2. **Legacy model and variant differences:** documents and comparison tables for MG-506 family and other researched models. Do not equate "legacy" with "discontinued" without evidence.
3. **Repair versus replacement:** decision factors, condition, repair scope, lead time, part availability, installation changes; avoid fabricated price benchmarks.
4. **Part-number and OEM cross-references:** exact published evidence with applicability scope and traceable source.
5. **Troubleshooting for real symptoms:** overheating, slipping, low oil pressure, vibration, no engagement; distinguish symptoms from diagnosis.
6. **Application-to-part discovery:** forestry, recycling, pumps, compressors, machine brands; equipment category does not prove exact SKU compatibility.
7. **Ontario-specific purchasing:** how RFQs, sourcing/shipping and technical review work for customers in real service areas, without pretending to have local offices.

## 5. Content clusters: these are not simply blog posts

Create **evergreen model hubs, technical guides, model comparisons, troubleshooting resources, exact SKU/product pages, application pages, and transactional RFQ/solution pages**.

### Cluster A — Marine transmissions and legacy models

**Hub:** /marine-transmissions/ and /marine-transmissions/mg-506/

**Proposed supporting content:**
- /resources/identify-twin-disc-marine-gear/ — locate model, BOM, ratio, serial number; safe photos.
- /resources/mg-506-1-vs-mg-506-a/ — source-checked variant comparison (do not infer interchangeability).
- /resources/mg-506-maintenance/ — source-checked maintenance checks, manual references and warnings, with qualified review.
- /resources/mg-506-parts/ — supported part families and quote links; avoid invented cross-references.
- /resources/marine-gear-repair-vs-replacement/ — diagnostic/decision framework; no fake estimates.
- /resources/mg-506-replacement-options/ — evaluation criteria, documented replacement paths only when verified.

**Publication gate:** the Launch-20 dataset is predominantly industrial PTO/clutch, not marine gear inventory. Marine pages require separate source verification and may be informational + RFQ until commercial evidence supports product pages.

### Cluster B — Industrial PTOs, clutches and service parts (first launch priority)

**Hubs:** /power-take-offs/, /power-take-offs/sp211/, /power-take-offs/cx110/, then SP111/SP314/SP318/CX107/CX108 as supported.

**Supporting pages:**
- /resources/identify-twin-disc-pto/ — identification plate, BOM, serial, machine/engine details, photo checklist.
- /resources/sp111-vs-sp211/ — compare only sourced configurations and documented differences.
- /resources/pto-clutch-slipping/ — symptoms, stop/use-safely cautions, model-specific review.
- /resources/pto-overheating/ — causes to investigate, source notes and professional assessment.
- /resources/sp211-clutch-parts/ — verified cross-references plus specific SKU pages.
- /solutions/twin-disc-pto-clutch-replacement/ — unknown-model assisted identification/RFQ.

**Initial existing SKU candidates:** SP211C006, SP318C003, CX110C005, A6518A, 6926E; then verified Draft SKUs. Maintain **HOLD** for SP211P304-TWD and SP111P340-TWD until service-replacement/order path is confirmed.

### Cluster C — Equipment and applications

**Hub:** /industries/

**Proposed pages:**
- /industries/wood-chippers/ — application explanation, model identification, qualified parts RFQ.
- /industries/forestry-recycling/ — machine-level identification, PTO duty, real documented equipment examples.
- /industries/pumps/ — drive and selection considerations (not arbitrary model fit).
- /industries/compressors/ — how to find and verify installed PTO models.
- Later: dredging, industrial process equipment, hydraulic pump drives, only where sources and buyer demand support coverage.

**Important:** OEM part-number keyword targets belong primarily on the **matching verified product page**. Don't create dozens of near-duplicate "Brand X part Y" doorway pages.

### Reusable page templates

| Template | Core blocks | Primary action |
|---|---|---|
| Model hub | Overview, configurations, table of sourced specs, ID steps, related components, documentation, FAQs | Find parts / submit model inquiry |
| Comparison | Intended comparison, side-by-side verified spec table, variation caveats, what must be checked | Request fitment review |
| Technical identification | Plate examples, where to look, model/BOM/serial capture, photo checklist, common uncertainty | Unknown-model RFQ |
| Maintenance / problem | Symptoms, possible causes, safe next steps, verified manual citations, part/service paths | Technical inquiry |
| Repair vs replace | Decision matrix, risk/availability considerations, what a technician must inspect | Quote/assessment |
| Product/SKU | Exact part and maker number, allowed cross refs, verified applications, exclusions, docs, related pages | Parts RFQ |
| Application | What the application requires, how model identification works, source-backed examples | Find compatible part |
| Solution / RFQ | Problem-led value proposition, optional model fields, 3-step form, post-submit workflow | Submit RFQ |
| Ontario location | Real market context and services actually available, local applications, evidence, genuine contacts | Local RFQ |

### Editorial source and compatibility rules

**Follow the existing repository rules:** [Phase 2–3 workflow](Phase%202-3%20Workflow.md), [relationship schema](../20-Architecture/Product%20Relationship%20Schema.md), [product database schema](../20-Architecture/Product%20Database%20Schema.md).

Source preference: (1) current Twin Disc official drawings/manuals; (2) OEM operator/service manuals; (3) authorized distributor; (4) reputable equipment service documentation; (5) secondary marketplaces for research hypotheses only.

- **PublishRule=Yes:** exact claim allowed *only within its documented scope*.
- **Family-only:** family/application background, never a specific machine-fit guarantee.
- **Review:** evidence gap; queue for technical review, don't present as confirmed interchangeability.
- **Hold:** no transactional publication or sale under the held reference.
- **No:** internal only.
- All mechanical specs, adjustment steps, service intervals, safety claims, oil requirements and replacement equivalences require the applicable revision and competent review. Do not paraphrase detailed safety-critical procedures into unsupported instructions.
- Distinguish OEM-number cross-reference from independently proven specific-machine fit.
- Include source URLs/revisions, authored/reviewed dates and status for technical pages.
- Respect documentation, images, trademarks and diagram licensing; link to originals when reproduction rights are absent.
- Do not expose raw employer SAP, private BOM/customer histories, internal prices, negotiated costs or stock in the public repo.

## 6. Information architecture and internal linking

Proposed navigation (paths subject to implementation verification):

```text
/
├── products/
│   ├── marine-transmissions/
│   ├── power-take-offs/
│   ├── clutches/
│   └── pump-drives/
├── marine-transmissions/
│   └── mg-506/                     (model hub)
├── power-take-offs/
│   ├── sp211/                      (model hub)
│   └── cx110/                      (model hub)
├── parts/
│   └── {verified-part-number}/     (SKU pages)
├── services/                       (only for verified actual capabilities)
├── resources/
│   ├── identify-twin-disc-pto/
│   ├── pto-clutch-slipping/
│   └── ...                         (evergreen technical library)
├── industries/
│   ├── wood-chippers/
│   └── ...                         (real application pages)
├── locations/
│   ├── hamilton/
│   └── ...                         (only supported locations)
├── solutions/
│   └── twin-disc-pto-clutch-replacement/
└── request-quote/
```

The category paths and model hub paths can be consolidated during technical architecture work to avoid duplicate canonical destinations. **Choose exactly one canonical model-hub URL**; do not expose equivalent /products/power-take-offs/sp211/ and /power-take-offs/sp211/ pages as two independently indexable copies.

**Internal link pattern:** symptom article → model family hub → relevant documented parts (or service page) → identification/RFQ; product page → parent model hub → verified related components and guides; application page → relevant model hub with clear evidence scope; Ontario location page → actual offered service or product category plus RFQ. Use descriptive natural anchor text.

## 7. Ontario local SEO targeting

Prioritize regional application-fit, not city-page volume:

| Launch tier | Region / corridor | Search focus | Page condition |
|---|---|---|---|
| T1 | Hamilton/Burlington — QEW/port | Marine & industrial equipment | Only genuine covered sourcing/service details |
| T1 | Niagara/St. Catharines — Welland Canal/QEW | Marine gear and vessel maintenance | Verify capabilities |
| T1 | Cambridge/Kitchener/Guelph — 401/8 | Industrial PTO, clutch, manufacturing equipment | Evidence-backed examples |
| T1 | Oshawa/Durham — 401/Lake Ontario | Parts and industrial/marine inquiry | Real delivery coverage |
| T2 | Barrie/Orillia/Midland — 400/11 | Marine equipment | Validate buyer demand |
| T2 | Windsor/Essex — 401 | Industrial and marine | Validate demand/fulfillment |
| T2 | Thunder Bay — Great Lakes/Trans-Canada | Marine, port and heavy industry | Verify fulfillment and market fit |

**Do not publish thin city-swap pages.** Each must have unique market/application substance, truthful coverage, actionable local details, and a specific supported service/RFQ. No invented branch address, Google Business Profile, emergency ETA, local technician or opening hours. Google Business Profile only if the business meets Google's eligibility criteria; one real location should not be multiplied into virtual locations.

## 8. Technical SEO and search experience

**Pre-launch checks:**
- Confirm true production domain, site ownership and business permissions.
- Crawl current/proposed pages; inventory live URLs, redirects, 404/5xx, status codes, rendering and duplicates.
- Robots directives, XML sitemap(s), canonical URLs, clean slugs, accessible crawlable links, robots noindex for nonpublic pages.
- Server-render/static-render important pages where appropriate (Astro is a candidate, not a validated existing stack).
- Unique titles/H1s/meta descriptions per search intent; pagination/filter canonical controls.
- Consistent breadcrumbs and usable category hierarchy; avoid generated empty/faceted pages.
- Mobile UX: primary RFQ visible, readable data tables, fast photo capture, accessible forms and error recovery.
- Product/Organization/Breadcrumb structured data only when content and business details qualify; **no fabricated price, availability, ratings, reviews or merchant offers**.
- Optimize images and Core Web Vitals; verify with field or lab data.
- Search by Twin Disc number, internal SKU, normalized punctuation, OEM number and family; honor verified relationships and HOLD rules.
- Index only genuine standalone pages; avoid doorway/spun programmatic content.
- Set up Search Console + privacy-compliant analytics, source attribution and form-event tracking.

## 9. RFQ and qualification experience

**Primary RFQ use case:** industrial PTO/clutch replacement where model/BOM/serial **may be unknown**.

**Step 1 — Need:** complete PTO, clutch, component, unknown; why replacing; machine down/still running/planned; timeframe.  
**Step 2 — Identification:** optional model, serial, BOM, machine make/model, engine, application, horsepower/RPM, drive arrangement, safely obtained images/docs. Missing model/BOM must **not** block submission.  
**Step 3 — Contact:** name, at least one contact channel, city, preferred contact, privacy consent, optional separate marketing consent.

After successful server-side persistence: reference ID, confirmation, triage into NEEDS_IDENTIFICATION / FAMILY_IDENTIFIED / COMPATIBILITY_REVIEW / TECHNICAL_HOLD / READY_TO_QUOTE. Store **urgency separately** (e.g., HIGH_URGENCY) from compatibility confidence; urgency never bypasses technical review. Candidate replacements remain unverified until appropriate evidence confirms applicability. No automatic quote or order for HOLD products.

Events: rfq_start, rfq_step_complete, rfq_submit, rfq_needs_identification, rfq_ready_to_quote, rfq_quoted, rfq_won. Avoid exposing contact details in analytics. Protect file uploads and retain as private customer submissions.

## 10. Suggested 15-page minimum viable SEO launch

Dependent on source, commercial and site checks:

1. PTO & clutch category hub.
2. SP211 model hub.
3. CX110 model hub.
4. SP211C006 verified SKU page.
5. SP318C003 verified SKU page.
6. CX110C005 verified SKU page.
7. A6518A verified SKU page.
8. How to identify a Twin Disc PTO.
9. SP211 part identification guide.
10. PTO clutch slipping — sourced troubleshooting guide.
11. PTO overheating — sourced troubleshooting guide.
12. Wood chipper PTO application / part identification page.
13. Unknown-model industrial PTO/clutch replacement RFQ page.
14. MG-506 marine transmission hub (independent research needed).
15. MG-506 identification guide (independent research needed).

**Adjustment:** 6926E already has substantial researched copy, and may replace any lower-readiness page in the initial 15; exact publishing order should follow evidence/commercial readiness and buyer intent, not arbitrary quotas.

## 11. Measurement and prioritization

**Primary KPIs:** qualified RFQs, RFQ → quote rate, quote → order rate, gross profit from organic-sourced orders where permitted, time-to-first-response, RFQ completeness/identification rate.

**SEO diagnostic KPIs:** Google indexed priority pages, impressions and clicks by exact SKU vs symptoms vs regional intent, non-branded organic clicks, organic RFQ-start/submit rate, page engagement, CWV, structured-data issues, crawl errors.

**Do not invent baseline or forecast values.** Collect baseline in SEO-01, then set concrete targets and monthly review cadence.

**Initial strategic order:** (1) exact SKU + OEM lookup and RFQ conversion; (2) SP211/CX110 model hubs + identification; (3) sourced troubleshooting/application content; (4) MG-506 legacy research; (5) unique supported Ontario pages.

## 12. Known gaps, risks and decision gates

- **Website not crawled:** technical issues, rankings and traffic remain unverified.
- **Commercial approval incomplete:** reseller/branding permissions, warranty/returns, service scope and sourcing rules.
- **Legacy technical research incomplete:** MG-506 comparison and replacements require new manual/spec validation.
- **HOLD assemblies:** SP211P304-TWD and SP111P340-TWD must not be promoted to purchasable/replacement pages prematurely.
- **Source/data safety:** public repo must remain sanitized; never publish confidential SAP/customer/cost data.
- **Scale risk:** SEO-automation can create duplicate, inaccurate, or safety-sensitive mechanical advice; editorial and technical approval is required.
- **Local doorway risk:** publish location pages only with meaningful location-specific utility and truthful operations.

**Execution reference:** follow [SEO Implementation Roadmap](../70-Project-State/SEO_IMPLEMENTATION_ROADMAP.md). Its SEO-00 to SEO-09 phases are a **parallel workstream** and do not renumber the existing business MASTER_ROADMAP phases.
