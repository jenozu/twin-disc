# Product Relationship Schema

## Purpose
Phase 4 converts product research into a graphable, source-backed relationship model that can drive Phase 5 product pages, search, SEO, cross-reference lookup, and later prospect targeting.

## Relationship record
Each public relationship uses:
- `SourceSKU` — MarIndustrial/SAP-style launch SKU.
- `RelationshipType` — normalized edge type.
- `TargetType` — type of entity on the other side of the relationship.
- `Target` — normalized family, OEM number, equipment model, application cluster, replacement number, or related product.
- `Scope` — `Exact`, `Family`, `Exact-equipment`, or another explicit scope.
- `EvidenceLevel` — who/what supports the relationship.
- `PublishRule` — `Yes`, `Family-only`, `Review`, `Hold`, or `No`.
- `SourceURL` — public evidence URL.
- `Notes` — restrictions or interpretation.

## Relationship types
- `MEMBER_OF` — SKU belongs to a Twin Disc product/model family.
- `PART_DEFINITION` — source-backed normalized description/configuration.
- `COMPONENT_OF` — source-backed parent assembly/family relation.
- `CONFIGURATION` — technical configuration explicitly documented.
- `OEM_CROSS_REFERENCE` — exact OEM part-number cross-reference.
- `AFTERMARKET_CROSS_REFERENCE` — aftermarket/manufacturer substitute or cross-reference.
- `USED_IN_EQUIPMENT` — exact equipment model contains/uses the source part.
- `APPLICATION_CLUSTER` — family-level normal application category.
- `SERVICE_REPLACED_BY` — official service replacement.
- `SUPERSEDED_BY` — source says a replacement/superseding part exists.
- `POSSIBLE_COMPATIBILITY` — useful research hypothesis that is not publication-ready.

## Publication rules
- `Yes`: may be used as an exact claim on a Phase 5 product page.
- `Family-only`: may describe a normal application of the family; do not imply exact equipment fit.
- `Review`: useful for research/SEO, but confirm with a stronger source before publishing as equivalence.
- `Hold`: do not publish/sell under the current number until the service/replacement status is confirmed.
- `No`: internal research only.

## Private SAP relationships
Internal SAP product trees/BOMs are intentionally excluded from the public dataset unless independently supported by public evidence. Negative SAP BOM quantities are treated as conversion/removal/substitution logic, not ordinary physical-component evidence.

## Phase 4 completion rule
A Launch-20 SKU is Phase-4 complete when it has:
1. a normalized product type/family;
2. an application path;
3. source/evidence scope;
4. a Phase-5 publication rule;
5. any exact OEM/equipment/replacement relationships captured where evidence exists.

Exact equipment evidence is not required for every SKU; uncertainty must be represented explicitly rather than guessed.
