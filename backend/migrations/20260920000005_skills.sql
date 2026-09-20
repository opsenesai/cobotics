-- 20260920000005_skills.sql
-- Per-user skill preferences. Owner-only via RLS.

create extension if not exists "pgcrypto";

create table if not exists public.skills (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  org_id      uuid references public.orgs (id) on delete set null,
  skill_id    text not null,
  enabled     boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint skills_user_skill_key unique (user_id, skill_id)
);

comment on table public.skills is 'Per-user enablement of built-in skills.';

create index if not exists skills_user_id_idx on public.skills (user_id);

drop trigger if exists skills_set_updated_at on public.skills;
create trigger skills_set_updated_at
  before update on public.skills
  for each row execute function public.set_updated_at();

alter table public.skills enable row level security;

drop policy if exists "skills_select_own" on public.skills;
create policy "skills_select_own"
  on public.skills for select using (auth.uid() = user_id);

drop policy if exists "skills_insert_own" on public.skills;
create policy "skills_insert_own"
  on public.skills for insert with check (auth.uid() = user_id);

drop policy if exists "skills_update_own" on public.skills;
create policy "skills_update_own"
  on public.skills for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "skills_delete_own" on public.skills;
create policy "skills_delete_own"
  on public.skills for delete using (auth.uid() = user_id);
