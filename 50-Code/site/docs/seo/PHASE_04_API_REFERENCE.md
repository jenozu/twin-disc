# SEO-04 API contract

All responses JSON, \`Cache-Control: no-store\`.

- \`POST /api/rfq\` accepts multipart \`payload\` JSON plus \`idempotency_key\` UUID and up to 3 \`attachments\`. Requires privacy acknowledgment, name, city, province, valid enum choices, and email **or** phone. All technical fields optional. Returns \`201 {accepted:true,reference,status,duplicate:false,attachmentFailures:N}\` only after DB persistence; retries return 200 with duplicate true. 422 field errors / unsupported file content, 429 rate limit, 503 configuration or persistence failure. Request body 3.5 MB ceiling, attachments 1 MB each JPEG/PNG/PDF signature-checked. Note: uploads happen **after** the DB transaction; partial upload problems are reported and never delete a valid inquiry.
- \`GET /api/admin/rfqs\`: Bearer Supabase JWT + allowlisted user ID. Optional status, urgency, category, city, source, from, to filters. Last 100 matching leads; client filters for city/source are applied within the fetched window.
- \`GET /api/admin/rfqs/:id\`: private detail, equipment, contact, activity, reviews, attachments.
- \`PATCH /api/admin/rfqs/:id\`: \`{action:"status",status,reason?}\`, \`{action:"note",notes}\`, \`{action:"followup",date:"YYYY-MM-DD"}\`, \`{action:"review",candidate_part,relationship_type,scope,publish_rule,source_url,verified}\`, \`{action:"quote",reference,amount}\`. DB rejects invalid transitions and unverified readiness.
- \`GET /api/admin/attachments/:id\`: creates authenticated short-lived 60s signed download URL for private storage.
- \`GET /api/admin/notifications\`: view delivery outbox.
- \`POST /api/admin/notifications\`: authorized operator invokes delivery/retry; disabled without approved Resend settings. Messages contain only reference, product category and urgency; never customer documents.

No public GET endpoint exposes customer contact details. No frontend writes with service-role credentials.
