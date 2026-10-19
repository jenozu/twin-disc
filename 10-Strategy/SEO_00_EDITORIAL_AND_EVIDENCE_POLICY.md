# SEO-00 — Editorial, Technical Evidence and Publication Standard
**Effective research version:** 2026-10-19 | **Approval status:** POLICY PROPOSED — HUMAN/TECHNICAL SIGNOFF PENDING.
Applies to every product/SKU, model hub, technical diagnosis, service, marine, comparison, legacy guide, OEM cross-reference and Ontario location page.

## Source hierarchy and provenance
1. Current manufacturer drawings, operator/service manuals and official product notices, matched to **specific model, suffix, BOM/serial, revision and territory**.
2. Machine OEM service/operator manuals explicitly identifying the component in a named machine/installation.
3. Authorized distributor verified part lists and published cross-references; record exact part and URL, not the site's blanket status as evidence.
4. Established industry technical references with disclosed authors/revisions, for explanatory context only.
5. Secondary seller/community content as **research lead**, never enough alone for exact equivalence, warranty, stock or technical safety instruction.

For every public technical statement keep `claim_id, source_url, document_name, publisher, edition/revision, page/table, accessed_at, applicable_models, scope, evidence_level, PublishRule, reviewer, review_date, next_review, image_license`. Revision missing = mark unknown and check before precision claims. Record both supportive and contradictory evidence.

## Compatibility publication gate
Use the exact Phase 4 `Scope` + `EvidenceLevel` + `PublishRule` fields; do not replace with vague AI confidence scores.
- `Yes` + `Exact`: print only supported part or OEM-number relationship. Do not claim all equipment installations compatible.
- `Yes` + `Exact-equipment`: print only the named equipment model/variant and sourced installation.
- `Family-only`: family/application description, never exact machine-level fit.
- `Review`: research queue / internal keyword mapping; hide transactional equivalence.
- `Hold`: prevent indexable product offer, price, Add to Cart and “confirmed replacement” assertions. Route customer to manual identification queue only.
- `No`: never publish.
- An official *service replaced by* note is not sufficient to assert current inventory, orderability or physical drop-in equivalence.
- Private SAP BOM structures do not override public publication rules.

## Writing standards
- Distinguish observed fact, cited manufacturer position, researched hypothesis, owner decision, and unverified customer-reported context.
- Every model/spec number uses units and correct variant/rating, with citation to revision; do not derive specs by copying a related MG-5065 or CX model.
- Troubleshooting: present observable symptoms, safe stop/isolating equipment warnings and questions for a technician; no unsourced adjustments, torque/pressure settings, oil choices, energized moving machinery instructions or unqualified “fix this yourself” claims.
- Legacy/discontinued: verify exact suffix, serial/BOM, date/revision, original availability and supersession path; offer identification RFQ if parts status unknown.
- Comparisons: show **source-confirmed differences only**; use 'not verified' for absent values; never use equal marketing descriptions as proof of interchangeability.
- Brand terms permitted for truthful factual identification do not imply an official dealership. Images, manuals and logos require separately documented reproduction rights; hyperlink to source rather than copying protected illustrations without licence.
- AI may draft headings, schema and synthesis from approved citations; may not invent specifications, compatibility, repair methods, reviewer credentials, prices, stock, authorizations or service guarantees. Never auto-publish AI drafts.

## Repeatable workflow
**1 Intake** (editor): assign unique intent, canonical URL, product/family scope, audience, required citations and risk level.
**2 Research** (researcher): build claim-to-source ledger with revision/page and opposing evidence.
**3 Draft** (AI/editor): create sections and unique RFQ CTA; insert unsupported-field placeholders rather than speculative copy.
**4 Technical review** (qualified technician or authorized supplier when required): validate correct model/BOM, safety language, exact cross-references, and Hold/Review statuses. Record name, evidence, approval date.
**5 Commercial/legal review** (owner + supplier/rights holder): ensure advertised offer, consent/privacy, location, dealer claims, image rights, returns/shipping and availability accurately reflect operations.
**6 Prepublish QA** (editor/dev): canonical/title/H1, accessible headings, internal linking, structured data truth, indexability, full source list, permissions, dry-run Hold exclusion.
**7 Approval**: set `PUBLICATION_APPROVED` only if source, technical and commercial gates are all fulfilled. Else `DRAFT`, `REVIEW` or `HOLD`; owners of each blocker recorded.
**8 Monitor**: quarterly review of priority commercial SKUs and cross-references, semiannual review of general guides, immediate re-review following safety/manufacturer revision, supplier status change or factual correction. Reassess SEO performance monthly once analytics exist.

## Standard page signoff record
`page_id | canonical_url | page_type | target_intent | source_ids | technical_reviewer | technical_approved_at | commercial_approver | commercial_approved_at | copyright_clearance | evidence_rule_snapshot | last_verified_at | next_review_at | publication_status | blocked_reason`

## QA hard stops
- Block SP211P304-TWD or SP111P340-TWD as orderable/equivalent until documented independent checks.
- Block SP314C002 secondary OEM numbers and 6926E secondary Bandit references as `Review`.
- Block false manufacturer authorization, local-office and emergency service assertions.
- Block any leaked PII, customer transactions, supplier costs, WH01 inventory or unpublished private BOM entries.
- Block schema.org `Offer` price/availability if no supported offer exists.
- Correct the existing `feat/twd-ondine-editorial-rfq` product notes and unsupported service claims **in a future separately approved code phase**; this research branch must not alter that experimental branch.
