#!/bin/sh
set -eu
umask 077
mkdir -p /backups
out="/backups/twd-rfq-$(date -u +%Y%m%dT%H%M%SZ).dump"
pg_dump --format=custom --no-owner --no-acl --file "${out}.partial"
pg_restore --list "${out}.partial" >/dev/null
mv "${out}.partial" "$out"
find /backups -type f -name 'twd-rfq-*.dump' -mtime +14 -delete
echo "Verified logical dump format: $(basename "$out")"
