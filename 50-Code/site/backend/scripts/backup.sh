#!/bin/sh
set -eu
umask 077
mkdir -p /backups
out="/backups/twd-rfq-$(date -u +%Y%m%dT%H%M%SZ).dump"
pg_dump --format=custom --no-owner --no-acl --file "${out}.partial"
pg_restore --list "${out}.partial" >/dev/null
mv "${out}.partial" "$out"
find /backups -type f -name 'twd-rfq-*.dump' -mtime +14 -delete
echo "Backup written: $(basename "$out")"
# Each Sunday, actually restore to a throwaway separate database.
if [ "$(date -u +%u)" = 7 ]; then
  restoredb=twd_rfq_restore_check
  dropdb --if-exists "$restoredb"
  createdb "$restoredb"
  cleanup() { dropdb --if-exists "$restoredb"; }
  trap cleanup EXIT
  pg_restore --no-owner --no-acl -d "$restoredb" "$out"
  psql -d "$restoredb" -Atc "SELECT count(*) FROM schema_migrations" | grep -Eq '^[1-9][0-9]*$'
  echo "Weekly restoration test passed"
fi
