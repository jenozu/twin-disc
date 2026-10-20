#!/bin/sh
set -eu
psql -v ON_ERROR_STOP=1 -v app_pass="$APP_DB_PASSWORD" --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<'SQL'
CREATE ROLE rfq_app LOGIN PASSWORD :'app_pass';
GRANT CONNECT ON DATABASE twd_rfq TO rfq_app;
GRANT USAGE ON SCHEMA public TO rfq_app;
SQL
