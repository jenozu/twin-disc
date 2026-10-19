# SEO-04 normalized schema

Apply in order:
1. \`supabase/migrations/202610190001_rfq.sql\`
2. \`supabase/migrations/202610190002_rfq_admin.sql\`

Tables:
- \`rfq_inquiries\`: unique idempotency key, random human reference, urgency, status, hashed visitor key, source attribution, follow-up date, quote and loss data.
- \`rfq_contacts\`: name, company, email or phone, location and separate privacy/marketing consent timestamps.
- \`rfq_equipment\`: optional manufacturer, model, OEM/serial/BOM, engine and configuration attributes.
- \`rfq_attachments\`: private object key and validated media metadata.
- \`rfq_activities\`: ordered private audit entries.
- \`rfq_compatibility_reviews\`: manual candidate, evidence scope, publication rule and reviewer identity.
- \`rfq_notifications\`: persistent outbox, delivery status, attempts and errors.

RLS enabled and anonymous/authenticated clients denied direct database table access. Only server-side service-role calls can submit or mutate using privileged RPC and only after server validation/authorization. \`rfq_submit\` is an atomic Postgres transaction; it stores the lead, contact, equipment, creation audit entry and notification outbox entry together. Rate limiting obtains a per-hash advisory lock before counting submissions.

\`rfq_admin_action\` validates status transitions inside the database and enforces exact, Yes + verified + sourced non-held review before READY_TO_QUOTE. Audit events are stored in the same transaction. No explicit replacement graph is automatically trusted.

Data deletion must include private storage objects BEFORE deleting matching lead database rows; cascading DB deletes do not automatically remove storage objects. Establish retention and backup review before launch. Do not import employer SAP exports.
