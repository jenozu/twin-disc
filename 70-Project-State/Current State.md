# Current State

## Status
Phase 1 SAP Product Intelligence is COMPLETE. The initial 20-SKU launch catalogue has been selected. Phase 2 product classification, Phase 3 application intelligence, and Phase 4 product relationships are COMPLETE for the Launch 20. Phase 5 e-commerce product-data production is READY TO START.

## Completed
- [x] Repository and Trade-Brain-style structure established.
- [x] Public-repo data safety rules added.
- [x] Twin Disc manufacturer records confirmed: 44 Twin Disc, 45 Twin Disc - Anneson, 46 Twin Disc - Rockford.
- [x] SAP Queries 01–13 completed locally, including currency-safe sales, WH01 inventory, SAP BOMs, purchase history, and open POs.
- [x] V1 product-opportunity workbook generated.
- [x] V2 launch-analysis workbook generated with system-currency sales, inventory, purchase-cost evidence, open POs, BOMs, and SKU × customer history.
- [x] Initial Top 50 ranked by demand, recency, customer breadth, ticket value, and prospectability.
- [x] Phase 2–3 evidence rules and research workflow documented.
- [x] Phase 2/3 Batch 01 completed for the first 10 priority SKUs.
- [x] Phase 2/3 Batch 02 completed for the additional 10 Launch-20 SKUs.
- [x] Launch 20 selected using demand, recent activity, customer breadth, stock/availability, application clarity, and exact part-number/OEM-search value rather than simply taking V1 ranks 1–20.
- [x] Public Launch-20 catalogue written to `40-Data/derived/launch20_public.csv`.
- [x] Phase 4 public relationship master completed in `40-Data/derived/phase4_product_relationships_public.csv`.
- [x] Phase 4 coverage matrix completed in `40-Data/derived/phase4_relationship_coverage_public.csv`.
- [x] Product relationship schema documented in `20-Architecture/Product Relationship Schema.md`.
- [x] Phase 5 handoff queue created in `40-Data/derived/phase5_handoff_public.csv`.
- [x] V4 Phase-4-complete workbook generated locally with public relationships, private SAP relationships, coverage, and Phase 5 handoff sheets.
- [x] 18 Launch-20 products cleared for Phase 5 drafting under evidence-specific publication rules.

## Important Findings
- Several lower-ranked service parts were promoted over stale/low-demand assemblies. In particular O5499E, 5659P, A5579D, and CX108P305 strengthen the launch catalogue with recurring service demand and clearer application/search paths.
- CX110C005 has an exact Vermeer cross-reference (603643003).
- SP318C003 has strong published OEM search paths including Terex, Vermeer, Bandit, and Trelan cross-references.
- 6926E has exact Bandit Beast 3680 Track / SP318SBO equipment evidence. The earlier Beast 2680 reference was corrected during Phase 4 validation.
- O5499E and 5659P map into the IBF314 high-inertia PTO service market, including crusher/tub-grinder applications.
- IT1071028B is an official AM220 pump-drive input assembly and opens a distinct hydraulic/drilling-equipment prospect segment.
- A6518A has exact Bandit Beast 3680 / SP314SB1 equipment evidence.
- SP211P304 and SP111P340 remain on HOLD because official Twin Disc drawings identify service-replacement numbers; confirm the current orderable number before publishing or selling under the old assembly number.
- Confidential SAP customer names, costs, inventory, and purchasing data remain local only. The public repository contains sanitized/derived product research only.

## In Progress
- [ ] Build Phase 5 website-ready e-commerce product records for the 18 READY products.
- [ ] Verify remaining secondary OEM cross-references before upgrading `Review` relationships to publishable exact equivalence.
- [ ] Build buyer archetypes and external prospect-search templates for each Launch-20 SKU.
- [ ] Confirm reseller economics and operating permissions with MarIndustrial.

## Blocked / Needs Human Input
- Final reseller relationship, branding permission, warranty/returns/drop-ship rules, and permitted use of employer data.
- Actual reseller discount/cost charged to the future business.
- Confirmation of SAP company system currency before treating Row Total (SC) as CAD for final economics.
- Current orderability/supersession status for SP211P304 and SP111P340.
- Final verification of secondary-source OEM cross-references before publication.

## Next Actions
1. Begin Phase 5 with the 18 READY products in `40-Data/derived/phase5_handoff_public.csv`.
2. Draft structured product records using Phase 4 publication rules: exact claims only where `PublishRule=Yes`; family applications remain family-level.
3. Keep SP211P304 and SP111P340 on HOLD until current service-replacement/order numbers are confirmed.
4. Convert SKU × customer patterns into buyer archetypes without publishing confidential customer history.
5. Begin the website MVP once the first Phase 5 records pass publication checks.

## Current Milestone
The initial 20-SKU catalogue is selected, researched, and relationship-mapped. Phase 4 is complete. Eighteen products are ready for Phase 5 product-record drafting; two remain held for service-replacement verification.
