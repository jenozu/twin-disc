# SEO-01 — Analytics, Indexing and Conversion Baseline
**Observation date:** 2026-10-19 | **Baseline:** UNVERIFIED, **not zero**.

| Source / capability | Status | Verification / next step |
|---|---|---|
| Google Search Console property (domain) | NOT ACCESSIBLE/NOT VERIFIED | Owner confirm DNS/domain ownership; grant read access; verify URL prefix/domain property, indexed pages, 3/16-month query exports. |
| Google Analytics 4 / privacy-compliant analytics | NOT VERIFIED | Obtain property ID/access or consent-compliant analytics plan; verify live tag on approved domain. |
| RFQ start event | NOT VERIFIED | Preview contains an RFQ form but does not indicate instrumentation. |
| RFQ submit event | **NOT FUNCTIONAL IN INSPECTED PREVIEW** | `50-Code/site/src/pages/rfq.astro` creates client-only draft; form intercept does not send/store. First implement real accepted request before counting submissions. |
| Sales/qualified RFQs/quote attribution | NOT VERIFIED | Define CRM keys `rfq_id, source, medium, landing_page, first_touch_utc, state, quote_id, order_id`; PII excluded from analytics payloads. |
| Onsite product search | CLIENT-ONLY IN PREVIEW; NOT INSTRUMENTED/VERIFIED | `50-Code/site/src/pages/products/index.astro` client-side filters. Instrument anonymized search category and result-count, avoid storing personal details. |
| Search ranking and tracked keywords | NOT VERIFIED | Record location/device/search engine/date/source before treating data as observed. |
| Indexed product pages | NOT VERIFIED | 18 DRAFT pages exist as code routes; not proof of Google indexing. |

## Definitions and baseline measurement plan
- **Organic search clicks / impressions:** GSC Web search type, Canada/Ontario as available; branded vs non-branded grouped using documented brand regex and exclusions; do not presume a site with no GSC history has zero traffic.
- **Exact SKU queries:** regex or maintained list for SP211C006, SP318C003, CX110C005, A6518A, 6926E and all 18 draftable Launch-20 part numbers, plus documented OEM numbers. Track query/page table by week/month.
- **Indexing:** number of approved, submitted, canonical product page URLs versus Google-indexed URLs; separately report sitemap count, 404, noindex, discovered/not-indexed.
- **RFQ starts:** unique session engages/opens approved RFQ; **RFQ submissions** only on server acknowledged/persisted success, excluding duplicates/test/spam. **Qualified** requires staffed verification (correct category, service area, actionable details, contact permission).
- **RFQ conversion:** `qualified_rfqs / valid_submissions`. **Quote rate:** `approved_quotes / qualified_rfqs`. **Quote win rate:** `closed_won_orders / approved_quotes`. Define cohort dates, attribution window and deduplication first.
- **Completed sales sourced to organic:** match CRM order to first/last organic touch (report both models), avoid claiming gross profit where real commercial costs are not approved. Consent and privacy controls apply.
- **Health metrics:** CWV (LCP/INP/CLS) from available CrUX/field data distinct from lab scores; crawl errors and internal-link coverage measured after public access.

## Minimum future event schema (no PII in event metadata)
`event_name, occurred_at, anonymous_session_id, rfq_id (server side where permitted), page_path, content_type, product_family, requested_sku_if_public, source, medium, campaign, result_status`.
Events: `site_search, sku_view, rfq_start, rfq_step_complete, rfq_submit_success, rfq_submit_error, rfq_qualified, rfq_quoted, rfq_won`. Never include name/email/phone/freeform notes/photo URL/serial number in public analytics.

## First verified baseline procedure
1. Owner selects/validates canonical host and appropriate tracking privacy policy.
2. Confirm GSC/analytics access; capture account-independent evidence (property, report dates, filters), not secrets.
3. Run and store a reproducible dated crawl; extract sitemap, indexed URLs, field CWV data.
4. Test a real RFQ flow end-to-end using test data only once a secure backend exists.
5. Publish first **measured** weekly/monthly baseline; leave earlier figures `NA — NOT OBSERVED`.
6. Review organic qualified RFQ, quote and sale outcomes monthly; segment by SKU, industrial PTO vs marine, content cluster and region.
