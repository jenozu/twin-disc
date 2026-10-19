# SEO-04 — self-hosted architecture (2026-10-19)
## Decision
**Node 22 / Fastify 5 / PostgreSQL 16 / private local disk / Argon2id / SMTP**. Chosen instead of Python/FastAPI because existing Astro wizard, data validator and qualification state machine are TypeScript, minimizing migration and duplicated business rules. There is **no active Supabase integration**.

## Data path
1. Astro static wizard \`/rfq/\` submits multipart to same-origin Astro server endpoint \`POST /api/rfq\` (on Vercel).
2. \`src/lib/rfq/gateway.ts\` strictly validates same-origin browser mutations, rejects oversized requests, inserts a private gateway credential, and forwards to a **dedicated HTTPS VPS API origin**. The browser cannot see this credential or database.
3. VPS Fastify application authenticates the gateway token, validates RFQ and attachment signatures, and uses a PostgreSQL transaction to persist inquiry, contact, equipment, activity and notification outbox. Reference and idempotency key unique in DB; rate limit is database-backed.
4. Private files are saved to a non-web-accessible named Docker volume *after* the DB transaction. Partial file failures are explicitly reported without erasing a persisted inquiry.
5. Dashboard \`/admin/rfqs/\` uses same-origin API requests with HttpOnly Secure SameSite=Lax opaque cookies, a server-stored hashed session token and CSRF header. Only self-provisioned active staff may access data. Admin-only technical signoff for readiness and SMTP dispatch.
6. Mail runs from a durable Postgres outbox, using configurable SMTP; credentials not present -> queue remains pending. Notification emails contain only reference/category/urgency; never attachments/contact data.

## Trust boundaries
Vercel server-to-VPS API (TLS + 32+ char shared gateway secret); VPS API loopback bind \`127.0.0.1:4387\` and separately authorized reverse proxy; PostgreSQL exclusively on internal Docker network, not published. No wildcard CORS, no frontend database credentials, no public static uploads. Secret must be present on both Vercel Preview and VPS. Staging DNS/TLS changes require owner approval. Database service role \`rfq_app\` has DML only; migration one-shot uses owner credentials.

## Compatibility and release boundary
Preserve SEO-03 publication/evidence checks and SEO-02 canonical design; no exact fit inferred from family, dimensions or urgency. \`SP211P304-TWD\` and \`SP111P340-TWD\` remain held. Preview pages stay noindex pending business approval. Do not merge or deploy production automatically.

## Risks
- Trust identity forwarded only by known Vercel infrastructure; if platform header unavailable, public inquiries share a cautious rate-limit bucket. Do not trust client-injected X-Forwarded-For.
- Attachment magic-byte checks do not provide PDF malware scanning. Private forced downloads, tight size limits and no previews mitigate but do not eliminate risk.
- Storage quota computed from DB is a best-effort quota; high-volume concurrency needs a serialized quota reservation.
- SMTP at-least-once worker may resend after a crash between send and acknowledgment.
- Cross-border hosting, retention, operator identity, DNS and legal privacy notice require owner review.
