# Self-hosted staging runbook (not executed on user's VPS)
## 0. Authorization and inventory
Before touching the VPS request read-only SSH access or owner-supplied output for \`uname -a; cat /etc/os-release; free -h; df -h; docker version; docker compose version; docker ps; ss -tulpn; sudo ufw status; sudo systemctl status nginx caddy traefik; ls -la /etc/letsencrypt\`. Redact IPs/secrets. Do not stop other applications, replace proxy, or add firewall rules until owner approves exact changes.

## 1. Prepare isolated stack
From repository working copy \`50-Code/site/backend\`, install Docker/Compose only after owner approval; never assume Docker is installed. Keep project name \`twd-rfq-staging\` separate. \`cp .env.staging.example .env.staging\`, fill 32+ char random secrets and distinct DB passwords (URL-safe), \`chmod 600 .env.staging\`. Set owner/migration and runtime URLs as given. Do NOT commit that file.

Run only after approval:
\`\`\`sh
docker compose --env-file .env.staging -f compose.staging.yml config --quiet
docker compose --env-file .env.staging -f compose.staging.yml build
docker compose --env-file .env.staging -f compose.staging.yml up -d postgres
docker compose --env-file .env.staging -f compose.staging.yml run --rm migrate
docker compose --env-file .env.staging -f compose.staging.yml up -d api backups
docker compose --env-file .env.staging -f compose.staging.yml ps
\`\`\`
API listens only on \`127.0.0.1:4387\` on the VPS; PostgreSQL has no published port. The API container runs as unprivileged \`node\` with dropped Linux capabilities. Confirm no collision at 4387 before startup.

## 2. Administrator provisioning
Create a temporary, owner-readable 0600 password file (16+ chars) outside repository, with access for container UID 1000. Use a one-time owner-role migration container with \`ADMIN_EMAIL\`, mount password file read-only as \`/run/admin-password\`, set \`ADMIN_PASSWORD_FILE=/run/admin-password\`; run \`node --import tsx backend/scripts/create-admin.ts\`. Remove temporary password file securely. No default login or self-signup.

## 3. TLS integration (requires explicit approval)
Pick an unused staging subdomain and add a site block to the **existing** reverse proxy after review (never replace global config). Target \`http://127.0.0.1:4387\`. Ensure TLS with a valid certificate; do not expose port 4387 on external interfaces. Restrict incoming direct public traffic where feasible, and require the backend gateway token on every non-health request regardless. Do not publish DNS without authorization.

On Vercel **Preview only**, configure \`RFQ_BACKEND_URL=https://<approved-staging-host>/\`, \`RFQ_BACKEND_SHARED_TOKEN=<matching secret>\`; keep \`SEO_APPROVED_FOR_INDEXING=false\`. Keep Deployment Protection enabled. Vercel same-origin gateway forwards customer and staff requests; cookies remain scoped to Vercel origin.

## 4. Test and verify
Use **synthetic** data. Unknown-model RFQ, reference in Postgres, contact/equipment/outbox, admin sign-in/session/CSRF/status audit, held part, private attachment, duplicate UUID, broken database, SMTP disabled/failed and post-recovery retry. Run frontend SEO build and the GitHub Actions backend job with ephemeral PostgreSQL. A Docker image build is not proof of deployed VPS services.

## 5. SMTP
Optional standard SMTP server: \`SMTP_HOST\`, \`SMTP_PORT\`, optional \`SMTP_USER\`, \`SMTP_PASSWORD\`, verified \`SMTP_FROM\`, internal \`SMTP_TO\`; enable \`NOTIFICATION_WORKER=true\` only after approval. No paid email provider required. Without SMTP, notification rows remain PENDING.

## 6. Backups/rollback
Compose \`backups\` service writes daily custom-format dump to private named volume, 14-day local retention. TEST RESTORE to **separate throwaway database** using \`pg_restore --no-owner --no-acl\`; compare counts and sample references, then destroy test instance. Include private upload volume in separately encrypted/offsite backups; neither filesystem nor database backup alone is sufficient. Rollback by reverting deployment image/commit; do not roll back shared database schema without a tested migration. Keep production website untouched.
