# Current State

## Status
Phase 1 SAP Product Intelligence extraction is COMPLETE. V1 product-opportunity analysis is COMPLETE and candidate validation is ACTIVE.

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

## Important Findings
- The raw sales ledger has 6,068 invoice lines and 1,149 unique Twin Disc item codes.
- The item master contains 7,602 Twin Disc/Rockford records; 7,321 are active.
- 4,813 item records have a positive CAD list price.
- 593 externally sold products show positive 5-year demand after excluding the MarIndustrial internal customer.
- Revenue fields are not currency-safe because document currency was not included in the export. Revenue is excluded from the V1 opportunity score.
- SAP aggregate queries can split one ItemCode across multiple rows when the description changes. The V1 analysis therefore rebuilds metrics from the raw ledger by ItemCode.

## In Progress
- [ ] Review/validate the first 20–50 SKU shortlist.
- [ ] Confirm reseller discount economics by SKU/product family.
- [ ] Begin Phase 2 product-family validation and Phase 3 application mapping.

## Blocked / Needs Human Input
- Final reseller terms and permissions with MarIndustrial.
- Confirmation that the 40% supplier discount applies to the shortlisted SKUs.
- Currency-safe SAP sales export if revenue will be used for ranking.

## Next Actions
1. Review the V1 top-50 candidate list.
2. Confirm or adjust the supplier discount assumption.
3. Add document currency (OINV.DocCur) and preferably a system-currency line-total field to the sales ledger.
4. Narrow the shortlist to the launch catalogue.
5. Research equipment/application compatibility for the selected products.

## V1 Milestone
Select the first 20–50 Twin Disc SKUs using observed demand, recency, customer breadth, economics, and application/prospectability.
