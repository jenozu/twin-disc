# SEO-04 PostgreSQL database and migrations
Active migration: \`backend/migrations/001_init.sql\`, applied once with \`backend/scripts/migrate.ts\` using \`DATABASE_URL_MIGRATE\`. Version tracking in \`schema_migrations\`. The historical Supabase migrations were removed from the working tree (available in Git history only).

Tables:
- \`rfq_inquiries\`: UUID, random public reference, idempotency UUID + SHA256 payload hash, salted visitor hash, category, reason, condition, urgency, request, qualification state, attribution, follow-up, quotation/loss, timestamps.
- \`rfq_contacts\`: contact fields, preferred channel, privacy acknowledgement timestamp, separate opt-in and timestamp.
- \`rfq_equipment\`: manufacturer, machine/engine data, optional model, serial, BOM and technical notes.
- \`rfq_attachments\`: private UUID storage key/filename/type/size.
- \`rfq_activities\`: audit history per inquiry.
- \`rfq_compatibility_reviews\`: manually reviewed candidate and evidence/source/approval; constraint prevents verified held parts.
- \`rfq_notifications\`: persistent outbox, retry/failure and lock timestamps.
- \`admin_users\`, \`admin_sessions\`, \`admin_login_attempts\`: no signup, Argon2id hash, opaque cookie sessions and login rate records.

Atomic submission uses \`BEGIN\` transaction, advisory locks for idempotency and visitor limit, foreign-key writes, creation activity and queued notification. Retry with same UUID + payload returns existing RFQ. Same key and different payload rejects with 409. Validation failure or DB failure must not show success.

Dedicated runtime DB login \`rfq_app\` is created on first private Postgres volume initialization by \`backend/initdb/01_app_role.sh\`. Migrator grants DML and sequence use after applying versioned schema, but not DDL. No published database port. Owner credential only supplied to migration/admin bootstrap job.

Backup: \`backend/scripts/backup.sh\` stores daily \`pg_dump -Fc\` with a 14-day on-host retention window; include the private upload volume in a separate secure encrypted offsite backup. A dump listing is NOT a restore test. Restore to an isolated disposable PostgreSQL DB, check table counts and private file mapping before release.
