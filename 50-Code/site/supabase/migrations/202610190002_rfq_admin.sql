-- Atomic internal workflow: only server-side service role may call.
alter table public.rfq_notifications drop constraint if exists rfq_notifications_status_check;
alter table public.rfq_notifications add constraint rfq_notifications_status_check
 check(status in ('PENDING','SENDING','FAILED','SENT'));

create or replace function public.rfq_admin_action(
 p_id uuid,p_actor uuid,p_action text,p_data jsonb
) returns jsonb language plpgsql security definer set search_path=public as $$
declare
 r public.rfq_inquiries%rowtype; target text; allowed text[];
 candidate text; rule text; scope_name text; source_url text; review_status text;
 amount numeric;
begin
 select * into r from public.rfq_inquiries where id=p_id for update;
 if not found then raise exception 'NOT_FOUND'; end if;
 if p_action='note' then
   if length(trim(coalesce(p_data->>'notes',''))) between 1 and 2000 then
     insert into public.rfq_activities(rfq_id,event_type,actor,notes)
     values(p_id,'INTERNAL_NOTE',p_actor::text,p_data->>'notes');
   else raise exception 'INVALID_NOTE'; end if;
 elsif p_action='review' then
   candidate=upper(trim(coalesce(p_data->>'candidate_part','')));
   rule=p_data->>'publish_rule';scope_name=p_data->>'scope';
   source_url=coalesce(p_data->>'source_url','');
   review_status=case when p_data->>'verified'='true' then 'VERIFIED' else 'PENDING' end;
   if length(candidate) not between 2 and 100 or
      rule not in ('Yes','Family-only','Review','Hold','No') or
      length(coalesce(p_data->>'relationship_type','')) not between 2 and 100 or
      length(coalesce(p_data->>'notes',''))>2000
      then raise exception 'INVALID_REVIEW';end if;
   if review_status='VERIFIED' and (
      rule<>'Yes' or scope_name not in ('Exact','Exact-equipment') or
      source_url not like 'https://%' or
      candidate in ('SP211P304-TWD','SP111P340-TWD'))
      then raise exception 'REVIEW_EVIDENCE_REQUIRED'; end if;
   insert into public.rfq_compatibility_reviews(rfq_id,candidate_part,relationship_type,scope,
     publish_rule,source_url,verification_status,reviewer_id,reviewed_at,notes)
   values(p_id,candidate,p_data->>'relationship_type',left(coalesce(scope_name,'Unverified'),50),
     rule,left(source_url,300),review_status,p_actor,
     case when review_status='VERIFIED' then now() else null end,left(coalesce(p_data->>'notes',''),2000));
   insert into public.rfq_activities(rfq_id,event_type,actor,notes)
   values(p_id,'REVIEW_RECORDED',p_actor::text,'Candidate: '||candidate||'; status: '||review_status);
 elsif p_action='followup' then
   if p_data->>'date' !~ '^\d{4}-\d{2}-\d{2}$' then raise exception 'INVALID_FOLLOWUP';end if;
   update public.rfq_inquiries set follow_up_at=(p_data->>'date')::date,
     updated_at=now(),updated_by=p_actor where id=p_id;
   insert into public.rfq_activities(rfq_id,event_type,actor,notes)
   values(p_id,'FOLLOWUP_SCHEDULED',p_actor::text,p_data->>'date');
 elsif p_action='quote' then
   if r.qualification_status<>'READY_TO_QUOTE' then raise exception 'NOT_READY';end if;
   if length(coalesce(p_data->>'reference','')) not between 1 and 100 then raise exception 'INVALID_QUOTE';end if;
   amount=(p_data->>'amount')::numeric;
   if amount<0 or amount>100000000 then raise exception 'INVALID_AMOUNT';end if;
   update public.rfq_inquiries set quote_reference=p_data->>'reference',
     quoted_amount=amount,updated_at=now(),updated_by=p_actor where id=p_id;
   insert into public.rfq_activities(rfq_id,event_type,actor,notes)
   values(p_id,'QUOTE_RECORDED',p_actor::text,'Quotation reference: '||p_data->>'reference');
 elsif p_action='status' then
   target=p_data->>'status';
   allowed=case r.qualification_status
    when 'NEW' then array['NEEDS_IDENTIFICATION','FAMILY_IDENTIFIED','AWAITING_INFORMATION','COMPATIBILITY_REVIEW','TECHNICAL_HOLD','CLOSED']
    when 'NEEDS_IDENTIFICATION' then array['AWAITING_INFORMATION','FAMILY_IDENTIFIED','COMPATIBILITY_REVIEW','TECHNICAL_HOLD','CLOSED']
    when 'FAMILY_IDENTIFIED' then array['COMPATIBILITY_REVIEW','AWAITING_INFORMATION','TECHNICAL_HOLD','CLOSED']
    when 'COMPATIBILITY_REVIEW' then array['READY_TO_QUOTE','AWAITING_INFORMATION','TECHNICAL_HOLD','CLOSED']
    when 'AWAITING_INFORMATION' then array['NEEDS_IDENTIFICATION','FAMILY_IDENTIFIED','COMPATIBILITY_REVIEW','TECHNICAL_HOLD','CLOSED']
    when 'TECHNICAL_HOLD' then array['COMPATIBILITY_REVIEW','AWAITING_INFORMATION','CLOSED']
    when 'READY_TO_QUOTE' then array['QUOTED','COMPATIBILITY_REVIEW','TECHNICAL_HOLD','CLOSED']
    when 'QUOTED' then array['FOLLOW_UP','WON','LOST','COMPATIBILITY_REVIEW','CLOSED']
    when 'FOLLOW_UP' then array['QUOTED','WON','LOST','CLOSED']
    when 'WON' then array['CLOSED']
    when 'LOST' then array['FOLLOW_UP','CLOSED']
    else array[]::text[] end;
   if not target=any(allowed) then raise exception 'INVALID_TRANSITION';end if;
   if target='READY_TO_QUOTE' and not exists (
     select 1 from public.rfq_compatibility_reviews v where v.rfq_id=p_id
     and v.verification_status='VERIFIED' and v.publish_rule='Yes'
     and v.scope in ('Exact','Exact-equipment')
     and v.source_url like 'https://%'
     and upper(v.candidate_part) not in ('SP211P304-TWD','SP111P340-TWD')
     and v.reviewer_id is not null and v.reviewed_at is not null
   ) then raise exception 'VERIFIED_EVIDENCE_REQUIRED';end if;
   if target='LOST' and length(trim(coalesce(p_data->>'reason',''))) < 3 then
     raise exception 'LOST_REASON_REQUIRED';end if;
   update public.rfq_inquiries set qualification_status=target,updated_at=now(),
      updated_by=p_actor,lost_reason=case when target='LOST' then left(p_data->>'reason',1000) else lost_reason end
   where id=p_id;
   insert into public.rfq_activities(rfq_id,event_type,actor,previous_status,new_status,notes)
   values(p_id,'STATUS_CHANGED',p_actor::text,r.qualification_status,target,
       left(coalesce(p_data->>'reason',''),1000));
 else raise exception 'UNKNOWN_ACTION';
 end if;
 return jsonb_build_object('id',p_id,'reference',r.reference,'action',p_action);
end $$;
revoke all on function public.rfq_admin_action(uuid,uuid,text,jsonb) from public,anon,authenticated;
grant execute on function public.rfq_admin_action(uuid,uuid,text,jsonb) to service_role;
