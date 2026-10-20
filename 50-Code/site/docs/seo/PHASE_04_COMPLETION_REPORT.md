# SEO-04 completion report (self-hosted migration)

**Classification: PARTIALLY COMPLETE.** No active Supabase packages or services; backend code exists but VPS staging has not been configured or proven against live PostgreSQL on the owner's server.

## Reused
Original three-step Astro customer wizard, validation/fields, optional model/serial/BOM, replacement page, status machine, evidence/held restrictions, dashboard layout, SEO-02/03 contracts and safe conversion events.

## Replaced
Supabase JS/Auth/Storage/RPC and Resend with VPS Fastify/PostgreSQL, local private disk, Argon2id sessions, HTTP-only cookies + CSRF, durable SMTP outbox. Old Supabase migrations deleted from active tree; version history preserved in Git. Astro API endpoints now forward through server-side same-origin HTTPS gateway; customer-facing wizard did not need redesign.

## Implemented
backend/src/app.ts, auth.ts, admin.ts, intake.ts, database.ts, storage.ts, mail.ts, guard.ts, config.ts; backend/migrations/001_init.sql; migration and staff bootstrap scripts; Compose/Docker build with internal-only database networking and private persistent volumes; admin list/review/quote/notes/attachments; backup/weekly restore script; owner-gated retention and orphan cleanup.

## Verified
Vercel protected preview for merge SHA 316d4916226d3eb45505f603f7f82ddc091fdc07 READY: https://twin-disc-s2kk5cbaq-jenozus-projects.vercel.app
Astro build and SEO/RFQ contract tests passed; Astro and isolated backend strict TS checks passed. Static preview SEO validator remains part of build.
Later changes require separate verification. GitHub Actions ephemeral Postgres integration job and restore job were QUEUED at last inspection. Real database persistence, authenticated downloads from a running VPS, SMTP sends, and actual restore are NOT yet verified.

## GitHub and safety
Existing branch feat/twd-seo-phase-04, PR #10 https://github.com/jenozu/twin-disc/pull/10. Upstream SEO-03 changes reconciled via two-parent merge without force-push. PR showed mergeable=true. Main, SEO-03 and live production website were not modified. No VPS connection, DNS change, or server deployment was performed.

## Outstanding owner actions
Authorize read-only VPS audit and isolated compose staging (including port 4387 availability), pick staging HTTPS subdomain and approve proxy block/DNS, supply credentials via protected secrets, establish private staff login, approve privacy/retention/malware and SMTP destinations. Then run synthetic complete end-to-end with Postgres and offsite upload backup; resolve upstream critical/high dependency advisories before any production merge.

## SEO-05/SEO-09 handoff
Model/SKU pages can pass /rfq/?part=; all fits require reviewed evidence. Safe twd-analytics events contain only event, step and enum category. SEO-02 canonical map remains approval-controlled. Preview/indexation policies remain in force.
