# Current State

## Status
Phase 1 SAP Product Intelligence extraction is COMPLETE. V1 product-opportunity analysis is COMPLETE. Phase 2 product classification and Phase 3 application intelligence are ACTIVE.

## Completed
- [x] Repository and Trade-Brain-style structure established.
- [x] Public-repo data safety rules added.
- [x] Master roadmap added.
- [x] Twin Disc manufacturer records confirmed: 44 Twin Disc, 45 Twin Disc - Anneson, 46 Twin Disc - Rockford.
- [x] Queries 01–08 run and exported locally.
- [x] Price List 1 (A) Price List CAD selected as the V1 list-price reference.
- [x] 10-year raw sales ledger, item master, price list, 12M/5Y/10Y product views, and 5Y customer view analyzed.
- [x] V1 product opportunity workbook generated.
- [x] Initial top-50 candidate ranking generated using demand, recency, customer breadth, ticket value, and prospectability.
- [x] Phase 2–3 evidence rules and batch workflow documented.
- [x] Phase 2 Batch 01 classification completed for the first 10 priority SKUs.
- [x] Phase 3 Batch 01 family applications/OEM cross-references/equipment evidence researched.

## Important Findings
- The raw sales ledger has 6,068 invoice lines and 1,149 unique Twin Disc item codes.
- The item master contains 7,602 Twin Disc/Rockford records; 7,321 are active.
- 4,813 item records have a positive CAD list price.
- 593 externally sold products show positive 5-year demand after excluding the MarIndustrial internal customer.
- Revenue fields are not currency-safe because document currency was not included in the export. Revenue is excluded from the V1 opportunity score.
- SAP aggregate queries can split one ItemCode across multiple rows when the description changes. The V1 analysis therefore rebuilds metrics from the raw ledger by ItemCode.
- The first research batch confirms that several top SKUs have strong OEM/aftermarket search paths, especially SP211P304, SP211C006, SP111C006, SP314S120, and A6518A.
- SP211P304 and SP111P340 have a source-status conflict: Twin Disc engineering drawings contain obsolete-for-production/service-replacement notes while Palmer Johnson currently lists those assemblies as active. Confirm current sellable/supersession status before publishing.

## In Progress
- [ ] Continue Phase 2 classification across the next priority-SKU batch.
- [ ] Continue Phase 3 exact equipment/OEM mapping.
- [ ] Review/validate the first 20–50 SKU launch shortlist.
- [ ] Confirm reseller discount economics by SKU/product family.
- [ ] Convert verified cross-references into product-page SEO terms and prospect-search terms.

## Blocked / Needs Human Input
- Final reseller terms and permissions with MarIndustrial.
- Confirmation that the 40% supplier discount applies to the shortlisted SKUs.
- Currency-safe SAP sales export if revenue will be used for ranking.
- Current sellable/supersession confirmation for products with conflicting public status evidence.

## Next Actions
1. Research Batch 02 (next 10 high-priority SKUs).
2. Validate supersession/current-order status for SP211P304 and SP111P340 through MarIndustrial/Twin Disc ordering data.
3. Promote exact OEM cross-reference products into the initial launch catalogue.
4. Build product relationship records for assembly → clutch → drive ring/service component.
5. Begin prospect searches using exact OEM cross-reference and equipment evidence rather than generic industry lists.

## V1 Milestone
Select and validate the first 20–50 Twin Disc SKUs using observed demand, recency, customer breadth, economics, application clarity, OEM cross-references, and verified equipment evidence.
