# SEO-02 Content Models and Adapters

Status: architecture and schema design complete; not wired to Astro. Source: Phase4 public relationship master, Phase5 public catalog/copy, SEO-00 claims, SEO-01 keyword map.

## Source-preserving adapter
- Source Phase4 columns: SourceSKU, RelationshipType, TargetType, Target, Scope, EvidenceLevel, PublishRule, SourceURL, Notes. Keep all as-is with sourceRowId, cited document/revision, applicable serial or BOM and technical review metadata added in a derived record.
- Join Phase4.SourceSKU to Phase5.SKU, retaining the internal suffix -TWD in identity; expose TwinDiscPartNumber as customer-facing part number. A join mismatch, conflicting source or missing revision produces a research/hold state, never inferred compatibility.
- Keep raw SAP customer, cost, stock, purchase, confidential BOM, internal inventory and personal data OUT of this public pipeline.

## Shared Page
id, type, canonicalPath, intent, title, h1, metaDescription, status, authorId, sourceIds, sourceRevision, claims, review, lastVerifiedAt, nextReviewAt, primaryCta, relatedIds, contentHash, sections, links and extra subtype fields.

## Structured technical types
Product: approved identity and Phase5 public-safe attributes, independent of inventory/orderability.
ProductFamily: exact documented MEMBER_OF relationships, subvariant applicability, Family-only application context.
TechnicalSpecification: parameter, value, unit, exact variant/BOM, source edition/page, claim ID, human review.
CompatibilityClaim: lossless Phase4 row, approved scope and reviewer/source/expiry fields.
OEMCrossReference: OEM_CROSS_REFERENCE with Yes/Exact only; a part-number match is NOT universal machine fit.
IdentificationGuide, Comparison, Troubleshooting, Maintenance, RepairVsReplace: cited and safety-reviewed sections, explicit scope and unknowns.
EquipmentApplication: Family-only context separate from exact named equipment installation.
OntarioLocation: verified seller coverage, unique regional utility, no invented local presence.
RFQSolution: accepts absent model, serial and BOM; a real backend/staff, consent and privacy are independent gates.
ContentSource: source ID/URL, publisher, revision, page/table, applicable model, accessed date, rights and conflict notes.
PublicationApproval: named human reviewers with dates, approved source snapshot and claim register IDs, next review date.

## Registry, fixtures, publication gates
Templates/SEO/page-types.json describes 11 template types and their subtype required fields; content-model.schema.json validates common shape and Approved/Published gate fields; types.ts is the future typed adapter contract. examples.json contains 11 intentionally unapproved Research-only fixtures. A passing schema does not mean a source-backed article or seller-approved offer exists.

Phase5 DRAFT remains non-indexable until verified human approval. Phase5 HOLD remains hard-blocked even when editorial page status claims Published. SEO page status needs qualified technical and commercial signoff, current evidence, copyright/privacy and operation checks. Never auto-map DRAFT to Approved and never let a JSON boolean alone impersonate authenticated human approval. SEO-03 must validate rendered cards, search, metadata and schema as well as input records.

See SEO_02_COMPATIBILITY_PUBLICATION_RULES.md for Yes/Exact, Exact-equipment, Family-only, Review, Hold, No and lifecycle requirements.
