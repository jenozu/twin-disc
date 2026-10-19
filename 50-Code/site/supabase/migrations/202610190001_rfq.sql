-- Apply using Supabase SQL Editor to an isolated project. Private, service-role-only data.
create extension if not exists pgcrypto;

create table if not exists public.rfq_inquiries (
 id uuid primary key default gen_random_uuid(),
 reference text unique not null,
 idempotency_key uuid unique not null,
 request_hash text not null,
 visitor_hash text not null,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now(),
 category text not null check (category in ('pto','clutch','component','marine','unsure')),
 reason text not null,
 equipment_condition text not null,
 urgency text not null,
 description text,
 part_number text,
 model_number text,
 qualification_status text not null check (qualification_status in
 ('NEW','NEEDS_IDENTIFICATION','FAMILY_IDENTIFIED','COMPATIBILITY_REVIEW',
 'AWAITING_INFORMATION','TECHNICAL_HOLD','READY_TO_QUOTE','QUOTED','FOLLOW_UP','WON','LOST','CLOSED')),
 technical_review_status text not null default 'PENDING',
 attribution jsonb not null default '{}'::jsonb,
 follow_up_at timestamptz,
 quoted_amount numeric(12,2),
 quote_reference text,
 lost_reason text,
 updated_by uuid
);
create index if not exists rfq_inquiries_created_idx on public.rfq_inquiries(created_at desc);
create index if not exists rfq_inquiries_rate_idx on public.rfq_inquiries(visitor_hash,created_at desc);
create index if not exists rfq_inquiries_status_idx on public.rfq_inquiries(qualification_status);

create table if not exists public.rfq_contacts (
 rfq_id uuid primary key references public.rfq_inquiries(id) on delete cascade,
 contact_name text not null,company text,email text,phone text,city text not null,
 province text not null,postal_code text,preferred_contact text not null,
 comments text,privacy_acknowledged_at timestamptz not null,
 marketing_consent boolean not null default false,
 marketing_consent_at timestamptz
);
create table if not exists public.rfq_equipment (
 rfq_id uuid primary key references public.rfq_inquiries(id) on delete cascade,
 equipment_manufacturer text,equipment_model text,equipment_type text,
 engine text,horsepower text,rpm text,drive_arrangement text,
 model_number text,serial_number text,bom_number text,oem_part_number text,technical_notes text
);
create table if not exists public.rfq_attachments (
 id uuid primary key default gen_random_uuid(),
 rfq_id uuid not null references public.rfq_inquiries(id) on delete cascade,
 storage_key text unique not null,original_filename text not null,
 media_type text not null check (media_type in ('image/jpeg','image/png','application/pdf')),
 size_bytes integer not null check (size_bytes between 1 and 1000000),
 created_at timestamptz not null default now()
);
create table if not exists public.rfq_activities (
 id uuid primary key default gen_random_uuid(),
 rfq_id uuid not null references public.rfq_inquiries(id) on delete cascade,
 event_type text not null,actor text not null,previous_status text,new_status text,
 notes text,created_at timestamptz not null default now()
);
create table if not exists public.rfq_compatibility_reviews (
 id uuid primary key default gen_random_uuid(),
 rfq_id uuid not null references public.rfq_inquiries(id) on delete cascade,
 candidate_part text not null,relationship_type text not null,scope text not null,
 publish_rule text not null check (publish_rule in ('Yes','Family-only','Review','Hold','No')),
 source_url text,verification_status text not null default 'PENDING',
 reviewer_id uuid,reviewed_at timestamptz,notes text,
 created_at timestamptz not null default now(),
 constraint held_parts_unverified check (
 verification_status <> 'VERIFIED' or upper(candidate_part) not in ('SP211P304-TWD','SP111P340-TWD')
 )
);
create table if not exists public.rfq_notifications (
 id uuid primary key default gen_random_uuid(),
 rfq_id uuid not null references public.rfq_inquiries(id) on delete cascade,
 kind text not null default 'NEW_RFQ',
 status text not null default 'PENDING' check (status in ('PENDING','SENT','FAILED')),
 attempts integer not null default 0,last_error text,created_at timestamptz not null default now(),
 sent_at timestamptz
);
-- Client and authenticated Supabase users cannot read raw RFQ data directly.
alter table public.rfq_inquiries enable row level security;
alter table public.rfq_contacts enable row level security;
alter table public.rfq_equipment enable row level security;
alter table public.rfq_attachments enable row level security;
alter table public.rfq_activities enable row level security;
alter table public.rfq_compatibility_reviews enable row level security;
alter table public.rfq_notifications enable row level security;
revoke all on public.rfq_inquiries,public.rfq_contacts,public.rfq_equipment,
 public.rfq_attachments,public.rfq_activities,public.rfq_compatibility_reviews,
 public.rfq_notifications from anon,authenticated;
-- Private bucket is NOT public. No storage SELECT policies for anon/authenticated.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('rfq-private','rfq-private',false,1000000,array['image/jpeg','image/png','application/pdf'])
on conflict (id) do update set public=false,file_size_limit=1000000,
 allowed_mime_types=array['image/jpeg','image/png','application/pdf'];

create or replace function public.rfq_submit(
 p_input jsonb,p_idempotency uuid,p_request_hash text,p_visitor_hash text
) returns jsonb language plpgsql security definer set search_path=public as $$
declare r public.rfq_inquiries%rowtype;
begin
 if length(p_visitor_hash)<>64 or length(p_request_hash)<>64 then
   raise exception 'INVALID_HASH';
 end if;
 perform pg_advisory_xact_lock(hashtextextended(p_visitor_hash,0));
 select * into r from public.rfq_inquiries where idempotency_key=p_idempotency;
 if found then
   if r.request_hash<>p_request_hash then raise exception 'RFQ_KEY_CONFLICT'; end if;
   return jsonb_build_object('id',r.id,'reference',r.reference,
     'status',r.qualification_status,'duplicate',true);
 end if;
 if (select count(*) from public.rfq_inquiries where visitor_hash=p_visitor_hash
     and created_at>now()-interval '1 hour')>=6 then
   raise exception 'RFQ_RATE_LIMIT';
 end if;
 insert into public.rfq_inquiries(
   reference,idempotency_key,request_hash,visitor_hash,category,reason,
   equipment_condition,urgency,description,part_number,model_number,qualification_status,attribution
 ) values (
   'RFQ-'||upper(substr(replace(gen_random_uuid()::text,'-',''),1,12)),
   p_idempotency,p_request_hash,p_visitor_hash,p_input->>'category',p_input->>'reason',
   p_input->>'condition',p_input->>'urgency',p_input->>'description',
   p_input->>'part_number',p_input->>'model_number',
   case when coalesce(p_input->>'part_number','')='' and coalesce(p_input->>'model_number','')=''
     and coalesce(p_input->>'serial_number','')='' and coalesce(p_input->>'bom_number','')=''
     then 'NEEDS_IDENTIFICATION' else 'NEW' end,
   jsonb_build_object('landing_page',p_input->>'landing_page','source',p_input->>'source',
     'medium',p_input->>'medium','campaign',p_input->>'campaign','referrer',p_input->>'referrer')
 ) returning * into r;
 insert into public.rfq_contacts (rfq_id,contact_name,company,email,phone,city,province,
   postal_code,preferred_contact,comments,privacy_acknowledged_at,marketing_consent,marketing_consent_at)
 values (r.id,p_input->>'name',p_input->>'company',p_input->>'email',p_input->>'phone',
   p_input->>'city',p_input->>'province',p_input->>'postal_code',
   p_input->>'preferred_contact',p_input->>'comments',now(),
   coalesce((p_input->>'marketing_consent')::boolean,false),
   case when coalesce((p_input->>'marketing_consent')::boolean,false) then now() else null end);
 insert into public.rfq_equipment(rfq_id,equipment_manufacturer,equipment_model,equipment_type,
   engine,horsepower,rpm,drive_arrangement,model_number,serial_number,bom_number,
   oem_part_number,technical_notes)
 values (r.id,p_input->>'equipment_manufacturer',p_input->>'equipment_model',
   p_input->>'equipment_type',p_input->>'engine',p_input->>'horsepower',
   p_input->>'rpm',p_input->>'drive_arrangement',p_input->>'model_number',
   p_input->>'serial_number',p_input->>'bom_number',p_input->>'oem_part_number',
   p_input->>'technical_notes');
 insert into public.rfq_activities(rfq_id,event_type,actor,new_status,notes)
 values (r.id,'CREATED','system',r.qualification_status,'Submission stored');
 insert into public.rfq_notifications(rfq_id,kind) values
   (r.id,case when r.equipment_condition='out_of_service' then 'URGENT_RFQ'
              when r.qualification_status='NEEDS_IDENTIFICATION' then 'IDENTIFICATION_RFQ'
              else 'NEW_RFQ' end);
 return jsonb_build_object('id',r.id,'reference',r.reference,
   'status',r.qualification_status,'duplicate',false);
end $$;
revoke all on function public.rfq_submit(jsonb,uuid,text,text) from public,anon,authenticated;
grant execute on function public.rfq_submit(jsonb,uuid,text,text) to service_role;
