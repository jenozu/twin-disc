# SEO-04 RFQ architecture (2026-10-19)

## Deployment boundaries
- Frontend: existing Astro 5 site (static route rendering), server endpoints: Astro \`prerender=false\` using \`@astrojs/vercel\`; **production must not be redeployed**.
- Backend: Supabase free-tier project recommended for Postgres, Supabase Auth, private Storage. Application server exclusively holds the service-role key.
- Admin: /admin/rfqs is an empty public shell. The server returns NO records without a valid Supabase access token whose authenticated user ID belongs to \`RFQ_ADMIN_USER_IDS\`.
- API: POST /api/rfq, GET /api/admin/rfqs, GET/PATCH /api/admin/rfqs/:id, GET /api/admin/attachments/:id, GET/POST /api/admin/notifications.
- No external provider is currently verified. Fail-closed 503 until secrets, migrations and authorized account are configured.
- Preserves SEO-03 existing SEO helpers and product publication gates. New landing path is provisional until SEO-02 confirms canonical route.
- Product/model/serial/BOM identification is *not required*; exact fit and service replacement are never inferred.
- New leads enter NEW or NEEDS_IDENTIFICATION, never READY_TO_QUOTE. Urgency is separate from status.
- Notification outbox row is committed atomically with RFQ. Authenticated operator can manually dispatch pending/failed messages via Resend; real delivery is disabled unless owner configures approved recipient/sender/API key.
- PHP/PDF malware scanner is not provided; PDF/JPEG/PNG are restricted, signature-checked, size-limited and stored privately. No public file URLs.

## Ownership / parallel-agent integration
SEO-04 owns \`src/lib/rfq/*\`, \`src/pages/api/*\`, \`src/pages/admin/rfqs.astro\`, \`src/scripts/rfq-*.ts\`, \`src/styles/rfq-04.css\`, SQL and Phase-04 docs/tests. Shared: \`astro.config.mjs\` and \`package.json\` now include the adapter/dependencies; \`src/pages/rfq.astro\` is the intended SEO-03 prototype replacement. SEO-03 branch was not modified. If SEO-03 changes during development, compare commits and manually reconcile before merge; do not force-push.

## Commercial gates
Independent sourcing only. No claim of authorization, guaranteed compatibility, inventory availability, onsite service, emergency response or approved replacement. Held parts SP211P304-TWD and SP111P340-TWD route to manual review; SQL forbids a verified review of either.

## Build note
Without live credentials, tests can verify local/mocked contracts and Astro build, *not* actual managed Postgres/Supabase Storage/Auth/Resend. Production cutover is prohibited until private staging end-to-end passes.
