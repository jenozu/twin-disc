# Current State

## Status
Phase 1 SAP Product Intelligence is COMPLETE. The initial 20-SKU launch catalogue has been selected. Phase 2 product classification and Phase 3 application intelligence are COMPLETE for the Launch 20. Phase 4 product relationships are ACTIVE.

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
- [x] Phase 4 public relationship database started in `40-Data/derived/phase4_product_relationships_public_batch01.csv`.
- [x] V3 launch-analysis workbook generated locally with Launch 20 and Phase 4 relationship sheets.

## Important Findings
- Several lower-ranked service parts were promoted over stale/low-demand assemblies. In particular O5499E, 5659P, A5579D, and CX108P305 strengthen the launch catalogue with recurring service demand and clearer application/search paths.
- CX110C005 has an exact Vermeer cross-reference (603643003).
- SP318C003 has strong published OEM search paths including Terex, Vermeer, Bandit, and Trelan cross-references.
- 6926E has exact Bandit Beast 2680 / SP318SBO equipment evidence plus a Bandit part-number path.
- O5499E and 5659P map into the IBF314 high-inertia PTO service market, including crusher/tub-grinder applications.
- IT1071028B is an official AM220 pump-drive input assembly and opens a distinct hydraulic/drilling-equipment prospect segment.
- SP211P304 and SP111P340 still require current sellable/supersession verification before publication because public sources conflict on status.
- Confidential SAP customer names, costs, inventory, and purchasing data remain local only. The public repository contains sanitized/derived product research only.

## In Progress
- [ ] Expand Phase 4 assembly/component/OEM/equipment/supersession relationships for all Launch-20 products.
- [ ] Verify secondary OEM cross-references before public compatibility claims.
- [ ] Build buyer archetypes and external prospect-search templates for each Launch-20 SKU.
- [ ] Start Phase 5 website-ready e-commerce product records.
- [ ] Confirm reseller economics and operating permissions with MarIndustrial.

## Blocked / Needs Human Input
- Final reseller relationship, branding permission, warranty/returns/drop-ship rules, and permitted use of employer data.
- Actual reseller discount/cost charged to the future business.
- Confirmation of SAP company system currency before treating Row Total (SC) as CAD for final economics.
- Current orderability/supersession status for SP211P304 and SP111P340.
- Final verification of secondary-source OEM cross-references before publication.

## Next Actions
1. Complete Phase 4 relationship records for the Launch 20.
2. Build Phase 5 website-ready product records from verified Phase 2–4 data.
3. Convert SKU × customer patterns into buyer archetypes without publishing confidential customer history.
4. Build the first external prospect database using exact OEM/equipment/application evidence.
5. Begin website MVP once the first product records pass publication checks.

## Current Milestone
The initial 20-SKU catalogue is now selected and researched. The project has moved from product discovery into relationship modeling, product-data production, and buyer acquisition.
