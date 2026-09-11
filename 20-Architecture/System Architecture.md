# System Architecture

## V1 Flow

SAP exports (local/private)
→ local import/cleaning
→ product-demand aggregation
→ pricing/margin enrichment
→ application/equipment mapping
→ opportunity scoring
→ selected product catalogue
→ website/RFQ
→ prospect database + CRM
→ order workflow
→ sales feedback loop

## Repository Boundaries
- `40-Data/` contains schemas/query definitions and sanitized examples only.
- `50-Code/` contains parsers, analysis/scoring logic, and later store/app code.
- `80-Outputs/` contains sanitized generated reports and publishable catalog/prospect outputs.
- Raw SAP/customer/cost data remains outside Git history.

## Planned Code Modules
- `50-Code/importers/` — ingest SAP XLSX/CSV exports.
- `50-Code/analysis/` — demand, recency, customer breadth, product affinity.
- `50-Code/scoring/` — product and prospect opportunity scoring.
- `50-Code/catalog/` — normalized product catalogue generation.
- `50-Code/prospecting/` — external company/equipment enrichment.
- `50-Code/store/` — e-commerce/RFQ application when implementation starts.

## Principle
Start product-first. Build around 20–50 proven SKUs, then expand based on real demand and sales feedback.
