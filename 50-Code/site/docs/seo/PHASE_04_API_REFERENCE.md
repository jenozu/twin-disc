# SEO-04 REST interface / same-origin gateway
Vercel route \`POST /api/rfq\` proxies multipart \`payload\` JSON and UUID \`idempotency_key\` plus up to 3 JPEG/PNG/PDF \`attachments\` to VPS. Server validates category/reason/condition/urgency, required name, city, province, privacy acknowledgment, valid email **or** telephone, optional technical ID fields. Max request 3.5 MB; max 3 files/1 MB each, signature sniffing; files in private storage. A persisted inquiry returns 201 \`{accepted:true,reference,status,duplicate:false,attachmentFailures:0}\`; idempotent retry returns 200. 422 validation and attachment errors; 409 duplicate-key conflict; 429 rate limit; 503 unavailable. No fake success. Failed uploads after a successful DB transaction return the same reference and nonzero \`attachmentFailures\`.

All /api/admin endpoints require an authenticated session cookie. Mutations additionally require an anti-CSRF header and gateway Origin check:
- POST \`/api/admin/login\` email/password; sets HttpOnly Secure same-origin cookie and returns initial CSRF.
- GET \`/api/admin/session\`: validates session, rotates CSRF, returns user email/role.
- POST \`/api/admin/logout\`: revokes session.
- GET \`/api/admin/rfqs\`: status, urgency, category, city, source, from/to filters, max 100.
- GET \`/api/admin/rfqs/:id\`: private contact/equipment/reviews/notes/files/history.
- PATCH \`/api/admin/rfqs/:id\`: actions \`status\`, \`note\`, \`followup\`, \`review\`, \`quote\`.
- GET \`/api/admin/attachments/:id\`: authorized raw file download, forced Content-Disposition attachment, no public URL.
- GET \`/api/admin/notifications\`: private delivery state; POST: admin-only SMTP send/retry, 503 without configured account.
- GET \`/healthz\`: minimal service health; \`/readyz\` checks private PostgreSQL connection and requires gateway token.

Errors are JSON without SQL strings, credentials, personal data or stack traces. API disables CORS and redirects. VPS reverse proxy should expose only this service through TLS after owner approval, restricted to gateway requests; direct callers still need a secret.
