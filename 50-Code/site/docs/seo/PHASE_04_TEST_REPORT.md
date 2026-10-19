# SEO-04 test report — 2026-10-19

## Verified on Vercel preview
- Verified build SHA: \`72c76b891a94d4a51afee64bd5f93622420187c2\`.
- Deployment ID: \`dpl_3rFL1K1e9oRk3JKeHaQdYGa9zN1m\` — READY.
- Preview: https://twin-disc-q6hyruovp-jenozus-projects.vercel.app (SSO-protected).
- Astro site generation passed with server adapter and 43 generated HTML pages.
- RFQ Node contract tests and existing SEO 15-test suite passed; no failed tests seen.
- SEO static validator: **passed 43 pages** (canonicals, links, preview robots, sitemap, JSON-LD).
- Astro check: **0 errors**, three nonblocking hints.
- npm dependency audit: **6 advisories** (1 critical, 4 high, 1 low). The critical item affects Astro 5. Recommended fixes include a major Astro / @astrojs/vercel upgrade. This is a **production-release blocker** until reviewed and addressed; a successful build is not security clearance.

## Test scope
RFQ tests exercise optional identifiers, held products, family-only relationships, email-or-phone validation, privacy consent, file signatures/sizes, fake idempotency, simulated failure, JWT auth rejection, status transitions, analytics privacy, upload association and simulated rate limit. **Mocks are not managed Supabase/storage proof**. Static CSS/mobile assertions are not equivalent to browser/device tests.

## Outstanding
- [ ] GitHub Actions run success (runs were queued at report time)
- [ ] Isolated real Supabase project, migrations and private bucket tested
- [ ] Submit real synthetic RFQ -> persisted contact/equipment/outbox -> dashboard changes
- [ ] Authenticated private attachment download tested in staging; unauthenticated rejected
- [ ] Notification delivery/failed retry verified against a properly configured sender
- [ ] Mobile/keyboard/screen-reader browser testing
- [ ] Dependency advisory remediation and security review
- [ ] Owner business/privacy/retention/technical approval

No live customer data was submitted or created. The preview is not connected to a working RFQ service; an unconfigured submission must fail rather than fabricate a reference.
