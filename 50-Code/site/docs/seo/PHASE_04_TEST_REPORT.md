# SEO-04 test report — self-hosted transition

## Evidence obtained
- 2026-10-19 Vercel preview merge SHA 316d4916226d3eb45505f603f7f82ddc091fdc07: READY. Preview https://twin-disc-s2kk5cbaq-jenozus-projects.vercel.app (Vercel SSO protection).
- Build chained: Astro client/server generation, RFQ contract tests, SEO regression tests, rendered preview sitemap/canonical/link/schema validator, npm dependency audit, Astro strict checking, backend dependency install and strict backend TypeScript checking. All completed to deployment READY.
- Source-level RFQ tests include unknown identifiers, held products, family-only versus exact evidence, contact and consent, PII-free analytics and backend gateway references.
- Backend integration test file backend/tests/integration.test.ts exercises a **real PostgreSQL connection when TEST_DATABASE_URL is configured**: idempotency, required fields, held items, private file upload and authentication, session/CSRF, audit/status/review, SMTP-disabled outbox and logout. The GitHub workflow provisions Postgres 16 and includes dump/restore validation.

## Not yet executed or proven
- GitHub Actions integration job remained queued during verification. Do not count real PostgreSQL tests or backup/restore tests as passed before the job completes.
- Docker Compose staging not launched on VPS. No real database, private volume, staff login, or SMTP provider has been exercised there.
- No real SMTP delivery (not configured).
- No live mobile-browser/keyboard/screen-reader assessment.
- No privacy/certificate/DNS infrastructure approval or external vulnerability remediation.

## Risk register
A prior production-dependency npm audit identified 6 advisories: 1 critical, 4 high, 1 low in Astro 5/Vercel transitive tree. Astro/adapter major upgrades need coordinated evaluation with SEO-03; do not mark safe for production merely because a build passes. File magic-byte sniffing is not malware scanning; restrict handling of PDFs until owner approves scanning or disables PDFs.

## Completion gate
Complete real synthetic path: Astro form -> protected HTTPS VPS API -> Postgres transaction -> reference -> private attachments -> authenticated admin -> audited status -> notification retry and actual separate-database backup restoration. Verify preview remains noindex and all other applications stay untouched.
