# SEO-03 implementation contract — 2026-10-19

**Base:** `feat/twd-lumo-interactive-redesign` (latest preview-ready Astro implementation). Research repo and site app are in the same `jenozu/twin-disc` repository; `main` has no `50-Code/site` application. No merge to main or production deployment.

## Independent building blocks
- `src/lib/seo.ts` and `src/lib/search.ts`: canonical origin/path validation, preview-safe indexation, sitemap allowlist, evidence-state mapping, exact-versus-family identifier normalization.
- `SeoHead`, `Breadcrumbs`, `TechnicalSpecTable`, `SourceReference`, `ProductIdentification`, `CompatibilityInfo`, `PublicationStatus`, `RelatedContent`, `RFQCTA` and `SeoContentLayout` interfaces.
- Existing model/source data may still contain unreviewed claims. All such claims need owner/technical approval before indexation.

## Required SEO-02 inputs before finalizing routes or publishing
1. Approved canonical domain and canonical URL policy, including legacy redirects for `/products/[sku]`.
2. Final category/model/SKU/guide/application/location schemas and distinct H1, meta and breadcrumb fields.
3. Final editorial publication state mapping, including `Scope`, `EvidenceLevel`, `PublishRule`, `SourceURL`, `PublicationStatus` and source revision/expiry.
4. Approved model family hubs and verified product links; avoid turning `Family-only` into exact fit.
5. Human approval of business identity, service territory, return/warranty representations and rights to technical documentation.
6. Verified technical editor for all previously drafted model-specific quantitative claims.

## Safety boundaries
- Existing DRAFT catalogue records are preview-only, excluded from indexable sitemaps.
- `SP211P304-TWD` and `SP111P340-TWD` are HOLD, remain excluded from publicly listed products and purchasing.
- A matching part number identifies a record, **not** a confirmed equipment fit, substitute or in-stock item.
- `Review` or `No` relationships do not imply exact replacement.
- Existing /rfq is a client-side preparation prototype with no submission backend (SEO-04).
- Do not ingest raw SAP BOM, pricing, stock, customer or cost data into this static application.

## Integration and test checklist
- Import SEO-02 schemas through a typed adapter after review, not an independent competing format.
- Migrate routes only after SEO-02 publishes canonical map and redirect plan.
- Run the Astro build and SEO validator; inspect `dist` sitemap, titles, canonicals, structured data and preview robots.
- Confirm the protected Vercel preview does not expose itself for indexing.
- Manual review: model claims and technical data source checks, responsive page quality, copyright, service commitments and RFQ backend.

## Current assumptions and dependencies
- `https://twd.andel-vps.space` is the **configured source-code canonical origin**, not verified production; owner confirmation pending.
- Indexation requires `VERCEL_ENV=production` and `SEO_APPROVED_FOR_INDEXING=true`. This is an intentional publication gate and **must not** be enabled before owner review.
- Preview deployments may be protected by Vercel SSO.
- SEO-02 branch must remain untouched; unresolved decisions are blocking full SEO-03 completion.
