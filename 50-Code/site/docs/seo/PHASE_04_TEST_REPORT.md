# SEO-04 test ledger (2026-10-19)

Automated contract tests: \`npm run test:rfq\` with Node 22 strips TypeScript.
Includes unknown-model RFQ, exact part identification, held product, family-only evidence, email-or-phone validation, file signatures/size, fake idempotent transaction, mock database failure, unauthorized JWT gate, transition restrictions, and static mobile/privacy contract checks.

**Integrity of evidence:** fake Postgres tests prove local service logic, **not a real managed DB transaction**. Static CSS/DOM contract checks are not equivalent to browser automation. Actual E2E requiring Supabase project, Auth, storage and Resend is not yet configured; no claim of successful live submission, real notification or staff login.

Results must be populated after workflow executes. Verification checklist:
- [ ] Automated tests pass on GitHub Actions
- [ ] Astro build passes
- [ ] Staging Supabase configured and migration applied
- [ ] Synthetic RFQ stored + idempotent re-submit
- [ ] Private attachment downloaded after auth
- [ ] Unauthorized attachment rejected
- [ ] Audit/state transitions persisted
- [ ] Resend notification delivered or queue independently verified
- [ ] Mobile Safari/Chrome + keyboard + screen reader browser QA
- [ ] Protected non-indexable Vercel preview
