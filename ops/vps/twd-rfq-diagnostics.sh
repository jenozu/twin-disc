#!/usr/bin/env bash
# Root-owned, fixed-scope diagnostics. Never prints passwords, tokens, lead PII or file contents.
set -Eeuo pipefail
umask 077
export PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

BACKEND=/root/projects/twin-disc/rfq-staging/50-Code/site/backend
ENV_FILE=/root/.config/twd-rfq-staging/staging.env
COMPOSE_FILE="$BACKEND/compose.staging.yml"
PUBLIC_HEALTH=https://rfq-staging.andel-vps.space/healthz

[[ "${EUID}" -eq 0 ]] || { echo "ERROR: root diagnostic runner required" >&2; exit 10; }
[[ "$#" -eq 1 ]] || { echo "ERROR: expected one allowlisted command" >&2; exit 11; }
case "$1" in status|rfq-check) ;; *) echo "ERROR: command not permitted" >&2; exit 12 ;; esac
[[ -r "$ENV_FILE" && -r "$COMPOSE_FILE" ]] || { echo "ERROR: staging configuration not found" >&2; exit 13; }

cd "$BACKEND"
compose() { /usr/bin/docker compose --env-file "$ENV_FILE" -f "$COMPOSE_FILE" "$@"; }

echo "Twin Disc RFQ staging diagnostic: $1"
echo "Project: twd-rfq-staging (no production changes)"

if [[ "$1" == status ]]; then
  compose ps
  echo "Loopback API health:"
  /usr/bin/curl --fail --silent --show-error --max-time 10 http://127.0.0.1:4387/healthz
  printf '\nHTTPS staging health:\n'
  /usr/bin/curl --fail --silent --show-error --max-time 15 "$PUBLIC_HEALTH"
  printf '\nStatus probe completed.\n'
  exit 0
fi

echo "Database schema available:"
compose exec -T postgres psql -U rfq_owner -d twd_rfq -Atc \
  "SELECT CASE WHEN to_regclass('public.rfq_inquiries') IS NOT NULL AND to_regclass('public.admin_users') IS NOT NULL THEN 'schema_ok' ELSE 'schema_missing' END;" \
  | /usr/bin/grep -Fx 'schema_ok'

echo "Backend readiness (authenticated inside container; token never printed):"
compose exec -T api node -e '
fetch("http://127.0.0.1:4387/readyz",{
 headers:{"x-internal-gateway-token":process.env.BACKEND_SHARED_TOKEN}
}).then(async response=>{
 if(!response.ok) throw new Error("readyz HTTP "+response.status);
 const result=await response.json();
 if(result.ready!==true) throw new Error("backend not ready");
 console.log("readyz_ok");
}).catch(error=>{console.error(error.message);process.exitCode=1;});
'

echo "Non-sensitive inquiry count:"
compose exec -T postgres psql -U rfq_owner -d twd_rfq -Atc "SELECT count(*) FROM rfq_inquiries;"
echo "RFQ staging read-only probe completed."
