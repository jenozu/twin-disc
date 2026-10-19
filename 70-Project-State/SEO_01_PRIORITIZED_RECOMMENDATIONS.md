# SEO-01 — Prioritized Recommendations and Release Dependencies
**Prepared:** 2026-10-19 | **Review state:** Research package written; public release **not** authorized.

## Method
Qualitative P0–P2 scores were formed from (1) purchasing/conversion intent, (2) existing Launch-20 product alignment, (3) Phase4 proof/PublishRule readiness, (4) likely buyer value, (5) Ontario relevance, (6) demonstrated content/competitor opportunity, (7) engineering effort and (8) ability to turn requests into qualified RFQs. *No search-volume, competition, performance, traffic, lead value, conversion or keyword ranking numerical inputs have been measured.* Priorities are hypotheses, not forecasts. Page candidates and evidence IDs: `SEO_01_KEYWORD_RESEARCH.csv`, `SEO_01_KEYWORD_TO_PAGE_MAP.csv`, `SEO_01_CONTENT_GAP_ANALYSIS.md`.

## Top 10 next actions, ranked by likely impact and readiness
| Rank | Action / owner | Expected business benefit | Readiness and gate |
|---|---|---|---|
| 1 | **Owner + Marindustrial:** approve an honest supplier/RFQ-only operating model, legal identity, commercial brand/trademark permissions, service restrictions and who answers enquiries. | Makes commercial pages and leads trustworthy; avoids wasting organic traffic on an unserviceable offer. | P0 **BLOCKED — HUMAN APPROVAL**. See SEO-00 approval checklist. |
| 2 | **Owner + developer:** identify and validate one canonical production domain, correct GitHub source branch, public deployment and access to a valid crawlable preview. | Allows real indexability audit and avoids canonical mismatch/duplicate domains. | P0 **BLOCKED — DEPLOYMENT/ACCESS**; preview code separate from strategy branch; configured `twd.andel-vps.space` not reachable to audit. |
| 3 | **Technical editor + owner:** lock Phase4 compatibility publishing rules in future page/content pipeline; correct Review-labeled notes for SP314C002 and 6926E in a separately approved website-code phase. | Prevents wrong-equivalence RFQs, damaging seller credibility and returns risk. | P0 **POLICY READY / CODE NOT STARTED**; two HOLD assemblies stay blocked. |
| 4 | **Developer + owner:** implement and test server-acknowledged RFQ submission, privacy consent, staff delivery and safe unknown-model identification; measure valid enquiries. | Enables real conversion from exact SKU and equipment problem searches. | P0 **BLOCKED — BUSINESS RESPONSE + SEO-04 implementation**; inspected preview form is local draft only. |
| 5 | **Content lead + reviewer:** prepare and approve 5 evidence-rich exact SKU landing pages: SP211C006, SP318C003, CX110C005, A6518A, 6926E, with properly scoped verified OEM aliases. | Highest direct purchasing intent; less friction for part-number searches. | P0 **CONTENT RESEARCH READY / SELLER AND TECH SIGNOFF PENDING**. |
| 6 | **SEO architect:** define canonical product/category and SP211/CX110 family hub architecture and a migration/301 plan from experimental `/products/[sku]` into eventual `/parts/{sku}` if approved. | Builds navigational and internal-link topical authority without duplicates. | P0 **READY FOR SEO-02 DESIGN**, code change forbidden under this task. |
| 7 | **Tech editor + developer:** source and write safe PTO identification and failure-condition guides (SP211 identification, slipping, overheating), with context-aware links to RFQ. | Captures urgent problem searches without pretending to provide 24/7 repair. | P1 **MANUAL REVISION/SAFETY REVIEW PENDING**. |
| 8 | **Data lead + technical reviewer:** finish remaining 13 Phase5 draft SKU briefs and retain exact-scope OEM links/technical QA; suppress SP211P304 and SP111P340 commerce until service ordering confirmed. | Broadens long-tail coverage across SP/CX, friction components and AM220. | P1 **PHASE5 DRAFTS INCOMPLETE / HOLD GATES**. |
| 9 | **Marine specialist:** obtain exact MG-506/-1/-A manufacturer manuals, specs and BOM revisions and prepare source-led legacy hub/ID/variant comparison. | Opens underserved legacy marine enquiries and prevents unsupported drop-in replacement copy. | P1 **RESEARCH DEPENDENCY**; not ready for precise comparison or overhaul claims. |
| 10 | **SEO/owner:** confirm Ontario fulfillment, then validate demand for Hamilton/Burlington and Waterloo Region before authorizing distinct local landing pages; set up Search Console/analytics and baseline once public site works. | Captures differentiated regional and measurable demand while avoiding thin city doorway content. | P1 **COVERAGE, LIVE SITE + ANALYTICS ACCESS PENDING**; other regions research backlog only. |

## Recommended SEO-02 entry
**GO — restricted to documentation/design**: SEO-01 qualitative query clusters and canonical candidate map, 45 page briefs, source policy and claim gates provide enough direction to draft one canonical hierarchy and reusable content models. **NO-GO — launch or content/code publication:** business/supplier approvals missing, live production domain not confirmed, no production crawl/GSC baseline, no working submitted RFQ and safety/technical reviewer not assigned. Do not move to SEO-03 or production release by interpreting design readiness as business go-live readiness.

## Other important findings
- The preview's `src/pages/robots.txt.ts`, `sitemap.xml.ts` and canonical logic are **observed in source only**; live crawling, redirects, CWV, structured data validity, mobile and HTTP statuses unverified.
- Vercel's `production` target returned a canceled deployment; working branch previews do not establish a live public production.
- Exact SKU and approved OEM-number aliases are an especially strong qualitative intent fit, regardless of available volume. Verify actual search interest later.
- Hamilton port/manufacturing, Waterloo manufacturing, Durham port, Midland marine, Windsor manufacturing and Thunder Bay heavy industry are real commercial contexts, but no region is automatically entitled to its own page.

## Status by SEO task
| Task | Status | Deliverable or open dependency |
|---|---|---|
| SEO-00.1 business scope analysis | **COMPLETE — RESEARCH** | Business scope/claims doc with confirmed/planned/unknown separations |
| SEO-00.2 claim register | **COMPLETE — REGISTER**, approvals pending | 23-row claim verification CSV and acceptable alternatives |
| SEO-00.3 compatibility restrictions | **COMPLETE — POLICY ANALYSIS** | Phase4 scope rules and two Hold products recorded |
| SEO-00.4 editorial/evidence standard | **COMPLETE — POLICY DRAFT**, approval pending | Source, rights, revision and technical signoff workflow |
| SEO-00.5 owner decision checklist | **COMPLETE — DOCUMENTED**; humans pending | Concise priority approvals and unlocks |
| SEO-01.1 site and technical SEO | **PARTIAL — CODE AUDIT**, **BLOCKED — LIVE CRAWL** | Verified Vercel/GitHub source; live indexing/CWV/HTTP unobserved |
| SEO-01.2 competitor research | **COMPLETE — QUALITATIVE SAMPLE** | Named competitors, source URLs and content architecture gaps; no traffic/ranking claims |
| SEO-01.3 keyword research | **COMPLETE — QUALITATIVE CANDIDATES** | 137 candidate phrases; volume and competition NA |
| SEO-01.4 Ontario opportunities | **COMPLETE — PUBLIC INDUSTRY RESEARCH**, local demand pending | Eight geographic demand hypotheses from sources; no unsupported service pages |
| SEO-01.5 content gaps/clusters | **COMPLETE — RESEARCH** | Three clusters with 45 candidate page briefs |
| SEO-01.6 keyword/page map | **COMPLETE — PROPOSED MAP**, owner priority approval pending | 43 canonical URL targets; anti-cannibalization rules |
| SEO-01.7 analytics | **PARTIAL — BASELINE INVENTORY**, **BLOCKED — ACCESS/DEPLOYMENT** | Measurement taxonomy; baseline explicitly UNVERIFIED |

**Acceptance rule:** A written plan or a code inspection is not a live-crawl completion. The human approvals, HTTP crawl, GSC access, working RFQ and release implementation remain uncompleted tasks in the SEO roadmap.
