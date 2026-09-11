# SAP Queries

## Purpose
These SQL Server-style SAP Business One queries support Phase 1 product intelligence.

## Execution Order
1. `sap-queries/00_find_twin_disc_manufacturer.sql`
2. `sap-queries/01_top_items_5yr.sql`
3. `sap-queries/02_top_items_10yr.sql`
4. `sap-queries/03_top_customers_5yr.sql`
5. `sap-queries/04_top_items_12mo.sql`
6. `sap-queries/05_sales_ledger_10yr.sql`
7. `sap-queries/06_item_master.sql`
8. `sap-queries/07_price_lists.sql`
9. `sap-queries/08_twin_disc_prices.sql`

## Important
Run Query 00 first. The later queries currently use a manufacturer-name filter and should be tightened to the confirmed FirmCode/name after Query 00 is validated in your SAP environment.

## Export Naming
- `01_twin_disc_top_items_5yr.xlsx`
- `02_twin_disc_top_items_10yr.xlsx`
- `03_twin_disc_top_customers_5yr.xlsx`
- `04_twin_disc_top_items_12mo.xlsx`
- `05_twin_disc_sales_ledger_10yr.xlsx`
- `06_twin_disc_item_master.xlsx`
- `07_twin_disc_prices.xlsx`

Raw exports stay local under `40-Data/raw/` and are ignored by Git.
