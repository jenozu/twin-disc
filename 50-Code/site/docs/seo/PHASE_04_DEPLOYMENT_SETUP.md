# SEO-04 staging setup (do not deploy production)

1. Create isolated Supabase project (free tier if eligible) and apply both SQL migrations from \`supabase/migrations\`; verify private \`rfq-private\` bucket.
2. Create one staff account through Supabase Auth with secure password/MFA where supported. Copy its user UUID into server-only \`RFQ_ADMIN_USER_IDS\`. Never allow arbitrary authenticated users access.
3. In the **isolated Vercel Preview environment only** set \`SUPABASE_URL\`, \`SUPABASE_SERVICE_ROLE_KEY\`, \`RFQ_RATE_SALT\` (random 32+ bytes). Add public \`PUBLIC_SUPABASE_URL\` and \`PUBLIC_SUPABASE_ANON_KEY\` for admin sign-in only; the anon key is expected public, the service-role key never is.
4. Optional notification integration: verified sender domain and \`RESEND_API_KEY\`, \`RFQ_NOTIFICATION_FROM\`, \`RFQ_NOTIFICATION_TO\`. Without these, RFQs persist in the outbox but **no email is delivered**. A signed-in administrator can dispatch pending notifications using the dashboard after setup.
5. Use a separate **synthetic-only staging DB** for preview and tests. Keep SEO_APPROVED_FOR_INDEXING unset/false, retain Vercel Deployment Protection. Do not connect live customer data without approval.
6. Test unknown model, exact part, held part, upload, duplicate, private file access, invalid auth, readiness gate, notification failures and status history. Run \`npm run build\` and \`npm run test:rfq\` from \`50-Code/site\`.
7. Inspect request/response logs with synthetic data only; verify that no Vercel public bundles contain server keys, migrations or PII.
8. **Before launch:** approve business identity/contact, legal privacy/retention policies, consent text, notification destination, authorized users, file scanning plan, DNS/canonical route, and run live private staging E2E. Never merge/deploy production automatically.

\`50-Code/site/.env.example\` lists keys, placeholders only.
