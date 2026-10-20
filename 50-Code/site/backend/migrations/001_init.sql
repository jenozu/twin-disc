-- SEO-04 / self-hosted PostgreSQL 16. Applied by scripts/migrate.ts under DB owner.
CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE IF NOT EXISTS schema_migrations(version text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE IF NOT EXISTS rfq_inquiries(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), reference text NOT NULL UNIQUE,
 idempotency_key uuid NOT NULL UNIQUE, request_hash text NOT NULL, visitor_hash text NOT NULL,
 category text NOT NULL CHECK(category IN ('pto','clutch','component','marine','unsure')),
 reason text NOT NULL CHECK(reason IN ('failed','worn','maintenance','upgrade','unknown')),
 equipment_condition text NOT NULL CHECK(equipment_condition IN ('out_of_service','operational','planned')),
 urgency text NOT NULL CHECK(urgency IN ('asap','one_week','one_month','planning')),
 description text, part_number text, model_number text,
 qualification_status text NOT NULL CHECK(qualification_status IN
 ('NEW','NEEDS_IDENTIFICATION','FAMILY_IDENTIFIED','COMPATIBILITY_REVIEW','AWAITING_INFORMATION',
 'TECHNICAL_HOLD','READY_TO_QUOTE','QUOTED','FOLLOW_UP','WON','LOST','CLOSED')),
 technical_review_status text NOT NULL DEFAULT 'PENDING',
 attribution jsonb NOT NULL DEFAULT '{}'::jsonb,
 follow_up_at timestamptz, quoted_amount numeric(12,2), quote_reference text, lost_reason text,
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS rfq_created ON rfq_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS rfq_status ON rfq_inquiries(qualification_status,created_at DESC);
CREATE INDEX IF NOT EXISTS rfq_visitor ON rfq_inquiries(visitor_hash,created_at DESC);
CREATE TABLE IF NOT EXISTS rfq_contacts(
 rfq_id uuid PRIMARY KEY REFERENCES rfq_inquiries(id) ON DELETE CASCADE,
 contact_name text NOT NULL,company text,email text,phone text,
 city text NOT NULL,province text NOT NULL,postal_code text,
 preferred_contact text NOT NULL CHECK(preferred_contact IN ('email','phone','either')),
 comments text,privacy_acknowledged_at timestamptz NOT NULL,
 marketing_consent boolean NOT NULL DEFAULT false,marketing_consent_at timestamptz
);
CREATE TABLE IF NOT EXISTS rfq_equipment(
 rfq_id uuid PRIMARY KEY REFERENCES rfq_inquiries(id) ON DELETE CASCADE,
 equipment_manufacturer text,equipment_model text,equipment_type text,engine text,
 horsepower text,rpm text,drive_arrangement text,model_number text,serial_number text,
 bom_number text,oem_part_number text,technical_notes text
);
CREATE TABLE IF NOT EXISTS rfq_attachments(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 rfq_id uuid NOT NULL REFERENCES rfq_inquiries(id) ON DELETE CASCADE,
 storage_key text NOT NULL UNIQUE,original_filename text NOT NULL,
 media_type text NOT NULL CHECK(media_type IN ('image/jpeg','image/png','application/pdf')),
 size_bytes int NOT NULL CHECK(size_bytes>0 AND size_bytes<=1000000),
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS rfq_attachments_by_rfq ON rfq_attachments(rfq_id);
CREATE TABLE IF NOT EXISTS rfq_activities(
 id bigserial PRIMARY KEY,rfq_id uuid NOT NULL REFERENCES rfq_inquiries(id) ON DELETE CASCADE,
 event_type text NOT NULL,actor text NOT NULL,previous_status text,new_status text,notes text,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS rfq_activity_history ON rfq_activities(rfq_id,created_at);
CREATE TABLE IF NOT EXISTS rfq_compatibility_reviews(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 rfq_id uuid NOT NULL REFERENCES rfq_inquiries(id) ON DELETE CASCADE,
 candidate_part text NOT NULL, relationship_type text NOT NULL, scope text NOT NULL,
 publish_rule text NOT NULL CHECK(publish_rule IN ('Yes','Family-only','Review','Hold','No')),
 source_url text,verification_status text NOT NULL CHECK(verification_status IN ('PENDING','VERIFIED')),
 reviewer_id uuid,reviewed_at timestamptz,notes text,
 created_at timestamptz NOT NULL DEFAULT now(),
 CONSTRAINT cannot_verify_held CHECK(
 verification_status<>'VERIFIED' OR upper(candidate_part) NOT IN ('SP211P304-TWD','SP111P340-TWD'))
);
CREATE INDEX IF NOT EXISTS rfq_reviews_by_rfq ON rfq_compatibility_reviews(rfq_id);
CREATE TABLE IF NOT EXISTS rfq_notifications(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),rfq_id uuid NOT NULL REFERENCES rfq_inquiries(id) ON DELETE CASCADE,
 kind text NOT NULL, status text NOT NULL DEFAULT 'PENDING'
 CHECK(status IN ('PENDING','SENDING','SENT','FAILED')),
 attempts int NOT NULL DEFAULT 0, next_retry_at timestamptz NOT NULL DEFAULT now(),
 locked_at timestamptz, last_error text, sent_at timestamptz,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS rfq_notification_queue ON rfq_notifications(status,next_retry_at);
CREATE TABLE IF NOT EXISTS admin_users(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),email text NOT NULL UNIQUE,
 password_hash text NOT NULL, role text NOT NULL DEFAULT 'staff'
 CHECK(role IN ('staff','admin')), active boolean NOT NULL DEFAULT true,
 created_at timestamptz NOT NULL DEFAULT now(),last_login_at timestamptz
);
CREATE TABLE IF NOT EXISTS admin_sessions(
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
 token_hash text NOT NULL UNIQUE, csrf_hash text,created_at timestamptz NOT NULL DEFAULT now(),
 expires_at timestamptz NOT NULL,revoked_at timestamptz
);
CREATE INDEX IF NOT EXISTS admin_session_valid ON admin_sessions(token_hash,expires_at);
CREATE TABLE IF NOT EXISTS admin_login_attempts(
 id bigserial PRIMARY KEY,identity_hash text NOT NULL,successful boolean NOT NULL DEFAULT false,
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS admin_login_rate ON admin_login_attempts(identity_hash,created_at DESC);
-- Application DB role gets DML only, not DDL. Provision roles separately in deployment procedure.
