# SEO-00 — Business Scope, Operational Claims and Publication Boundaries
**Research date:** 2026-10-19 | **Status:** RESEARCH COMPLETE; COMMERCIAL APPROVAL PENDING | **Source of truth:** `MASTER_ROADMAP.md`, `10-Strategy/Business Model.md`, Phase 4/5 public data. No new seller authorization is inferred.

## 1. Evidence-classified business model
| Topic | Classification | Evidence / result |
|---|---|---|
| Independent commercial platform | DOCUMENTED PLAN | Owner-run customer acquisition, catalogue and RFQ, purchasing fulfilled items from Marindustrial under a future agreement; `10-Strategy/Business Model.md`. |
| Primary buyer | DOCUMENTED PLAN | Maintenance/fleet managers, purchasing staff, repair shops, equipment operators and marine owners; SEO strategy. |
| Geographic scope | DOCUMENTED INTENT | Ontario customer market, with region-specific content only when actual delivery/response capabilities are verified. |
| Initial offering | DOCUMENTED PLAN | Twin Disc industrial PTOs, clutch assemblies, drive rings, friction components, pump-drive parts, identification/quote inquiries; 20 public-safe SKU records, 18 DRAFT and 2 HOLD. |
| Fulfillment | UNRESOLVED | Approved account, price/discount, procurement, shipping, returns, tax, credit and availability arrangements must be confirmed. RFQ-only is the existing publishing default. |
| Mechanical repairs, overhaul, field visits, emergency dispatch | UNCONFIRMED / NOT ADVERTISABLE | No evidence the new seller operates a staffed workshop, mechanics, or 24/7 emergency response. Treat requests as *inquiries*, not service guarantees. |
| Business name, contact and domain | UNRESOLVED | Preview UI calls itself Powertrain Parts; Astro `SITE_URL` is configured to `https://twd.andel-vps.space`. Neither establishes a launched legal trading entity or a reachable production domain. |
| Supplier relationship | DOCUMENTED INTENT, NOT APPROVED | Marindustrial is named as proposed upstream supplier, not an executed reseller agreement. |
| Manufacturer status | VERIFIED FOR A DIFFERENT ENTITY | Twin Disc publicly lists MARINDUSTRIAL at https://twindisc.com/distributors/marindustrial-ontario/; **this does not authorize the independent TWD company** to claim Twin Disc dealer/distributor status or use another entity's address. |

## 2. Recommended defensible public position (owner review required)
Working description: “Independent Twin Disc part-number identification and sourcing inquiries for industrial PTO, clutch and selected marine transmission applications in Ontario.” Attribute all specifications to model/document revisions and state that fit, quotation, supply and delivery are subject to review. This is not authorization to launch public commerce.

Allowed pending brand/copyright review: neutral factual brand/model identification and “request a parts identification review”; avoid falsely claiming approval, stocked goods, factory warranty, guaranteed local repair, express shipping, same-day technician, mobile field service or emergency dispatch. Do not promise lead times, prices or territories.

## 3. Difference between commerce and service
**Commerce:** Collect a part inquiry; review applicable source, model, BOM, equipment and manufacturer/OEM number; verify orderable part, cost, lead time, taxes, shipment and policy; send quote after approval; buy/fulfill through approved supplier path. No automatic purchase or compatibility guarantee.
**Mechanical service:** Diagnose, inspect, install, rebuild or dispatch a technician. This requires documented capability, insurance, safety procedures, service territory and responsible operator. If absent, publish only honest “parts for repair projects” and “repair inquiry” pathways, not `/services/urgent-repair/`.

## 4. Phase 4–5 evidence rules — mandatory
- Data: `40-Data/derived/phase4_product_relationships_public.csv`; `20-Architecture/Product Relationship Schema.md`; `40-Data/derived/phase5_product_catalog_index_public.csv`. Public-safe 20 Launch SKUs: 18 DRAFT; **SP211P304-TWD and SP111P340-TWD HOLD**.
- Preserve `Scope`, `EvidenceLevel`, `PublishRule`, `SourceURL`, `Notes` for every generated claim. **Exact** does not mean interchangeable with every family member; **Exact-equipment** applies only to the named equipment installation. `Yes` within the recorded scope only. `Family-only` is contextual, not exact fitment. `Review` is an unverified search lead. `Hold` blocks transactional publication. `No` is nonpublishable.
- SP211P304 drawing records service reference `PX1039839C`; SP111P340 drawing records `PX1039800D`. These are research leads to order-path review, **not proven drop-in replacement/orderable assemblies**. See original drawing URLs in the Phase 4 public CSV. Technical review and supplier confirmation required.
- Safeguard known direct evidence: CX110C005 ↔ Vermeer 603643003; SP318C003 ↔ listed Bandit/Vermeer/Terex/Trelan numbers; A6518A documented in Bandit Beast 3680/SP314SB1; 6926E documented in Beast **3680 Track**/SP318SBO. 6926E aftermarket Bandit numbers and SP314C002 secondary OEM numbers remain `Review`.
- `DRAFT` is not `APPROVED`. Exact technical claim eligibility never implies price, stocking or seller rights.

## 5. Existing preview-site risk requiring future technical remediation
`feat/twd-ondine-editorial-rfq:50-Code/site/src/data/products.ts` includes `productNotes` phrased “OEM cross references” for SP314C002 and 6926E, while Phase 4 marks the relevant cross-references `Review`. In any site release, conditionally suppress those assertions or relabel as non-authoritative inquiries pending evidence. The same branch includes MG-506 “rebuilds & service” page copy that implies available services without the new seller's confirmation. Documented code observations, **not** claims about a live public website.

## 6. Privacy and employer boundary
This public repo must contain neither raw SAP exports, customer/prospect contact info, confidential customer orders, purchase costs, negotiated terms, WH01 stock, private BOMs nor credentials. Sanitized, independently supportable product data only. `README.md`, `MASTER_ROADMAP.md` and Phase 4 schema are binding. Do not repeat private internal pricing assumptions in consumer SEO copy.

## 7. Decision and publication state
SEO-00 research/evidence inventory is complete. **SEO-00 operational exit gate is BLOCKED — HUMAN APPROVAL** on entity, distribution/sourcing permission, operational response, warranties/returns, public data/assets permissions. Detailed claim-by-claim decisions: `SEO_00_CLAIM_VERIFICATION_REGISTER.csv`. Owner decisions: `SEO_00_HUMAN_APPROVAL_CHECKLIST.md`.
