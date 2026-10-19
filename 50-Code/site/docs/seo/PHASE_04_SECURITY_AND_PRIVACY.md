# SEO-04 security and Canadian privacy review

- HTTPS for preview/live endpoints; security enforced by Vercel TLS. Non-production pages explicitly noindex. Admin endpoints require bearer auth plus configured allowlisted Supabase Auth UUID; public JS has only the *public anon key*.
- RFQ values validated server-side; UI uses textContent for untrusted values. Supabase SQL calls are parameterized (SDK/RPC). SQL row-level security denies direct client data access.
- Restrict request body to 3.5 MB, 3 files x 1 MB, accept JPEG/PNG/PDF signatures only, sanitize filenames. Store in nonpublic bucket; grant temporary download link only through authorized server endpoint.
- Suspicious PDFs can still contain malware. This version does not scan malware. Provide restricted staff handling, avoid auto-processing PDFs, and add scanning before accepting broader formats or higher volume.
- IP-based abuse controls: server-side rate check using salted one-way visitor hash in database; honeypot in form; idempotency UUID. These controls do not replace WAF/CAPTCHA if attacked.
- Use env for credentials; never commit real credentials, SAP exports, internal BOM/inventory/cost data, or real user records. Do not put names, contact details, technical serials or free-text in public conversion events.
- Separate \`privacy_acknowledged\` from opt-in \`marketing_consent\`, unchecked by default. Log original consent timestamps. Do not use opt-in for outbound marketing until CASL consent wording and identity/contact/unsubscribe flow are approved.
- PIPEDA principles generally require appropriate purpose notice, limited collection, safeguards, access/correction and justified retention; the Office of the Privacy Commissioner guidance: https://www.priv.gc.ca/en/privacy-topics/privacy-laws-in-canada/the-personal-information-protection-and-electronic-documents-act-pipeda/pipeda_brief/
- CRTC distinguishes requested inquiry responses from certain requested quotes; marketing messages have separate consent/information/unsubscribe considerations: https://www.crtc.gc.ca/eng/com500/info.htm and https://crtc.gc.ca/eng/com500/faq500.htm
- Owner/legal review required: identity, public privacy notice, collection purposes, cross-border processors, retention schedule, deletion/access procedure, breach response and CASL marketing mechanics. Do not assert certified compliance.
- Proposed interim retention is **not approved**. Owner must choose retention (e.g. 12–24 months for inactive leads), with deletion of database + private object storage and documented backups lifecycle.
- Supabase backups and recovery depend on selected plan; confirm actual availability before launch.
