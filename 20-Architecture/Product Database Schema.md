# Phase 5 Product Database Schema

## Purpose
Phase 5 turns the Launch 20 into structured e-commerce records for product pages, search, SEO and RFQ.

## Public-safe fields
Priority, SKU, TwinDiscPartNumber, Manufacturer, PageType, ProductTitle, Slug, ProductFamily, TwinDiscModelFamily, ShortDescription, FullDescription, TechnicalSpecs, FamilyApplications, ExactOEMCrossReferences, VerifiedEquipment, ServiceReplacement, RelatedPartsOrFamilies, ResearchConfidence, PrimarySource, SecondarySource, PricingMode, SEOTitle, MetaDescription, SearchKeywords, PublicationStatus, PublicationNotes.

## Private/local-only fields
The local workbook also contains CAD list price, scenario reseller cost, scenario web price, scenario gross profit/margin, Warehouse 01 stock and Warehouse 01 incoming quantity. Do not commit those values to the public repository.

## Pricing rule
Until reseller terms are confirmed, `PricingMode = RFQ`. Scenario prices are planning inputs only.

## Compatibility rule
- Exact OEM/equipment claims require a Phase 4 `PublishRule=Yes` relationship.
- Family applications must be presented as family-level context.
- `Review` relationships are research leads, not exact public claims.
- `Hold` blocks publication.
- Private SAP product-tree relationships are not public compatibility evidence.

## Current state
- 20 launch products structured.
- 18 products are `DRAFT`.
- SP211P304-TWD and SP111P340-TWD are `HOLD`.
- Batch 01 contains full copy for SP211C006-TWD, SP318C003-TWD, CX110C005-TWD, A6518A-TWD and 6926E-TWD.

## Still needed before checkout-ready publication
- approved reseller pricing/cost rules;
- live availability source/refresh method;
- weights and dimensions;
- country of origin where required;
- product imagery/assets and usage rights;
- warranty and returns language;
- taxes and shipping behavior.
