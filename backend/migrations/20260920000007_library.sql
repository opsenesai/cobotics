-- 20260920000007_library.sql
-- Per-user library assets. Owner-only via RLS.

create extension if not exists "pgcrypto";

create table if not exists public.library_assets (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users (id) on delete cascade,
  org_id        uuid references public.orgs (id) on delete set null,
  name          text not null,
  type          text not null default 'file',
  storage_path  text,
  metadata      jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

comment on table public.library_assets is 'Per-user library assets (files, links, etc.).';

create index if not exists library_assets_user_id_idx on public.library_assets (user_id);

drop trigger if exists library_assets_set_updated_at on public.library_assets;
create trigger library_assets_set_updated_at
  before update on public.library_assets
  for each row execute function public.set_updated_at();

alter table public.library_assets enable row level security;

drop policy if exists "library_assets_select_own" on public.library_assets;
create policy "library_assets_select_own"
  on public.library_assets for select using (auth.uid() = user_id);

drop policy if exists "library_assets_insert_own" on public.library_assets;
create policy "library_assets_insert_own"
  on public.library_assets for insert with check (auth.uid() = user_id);

drop policy if exists "library_assets_update_own" on public.library_assets;
create policy "library_assets_update_own"
  on public.library_assets for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "library_assets_delete_own" on public.library_assets;
create policy "library_assets_delete_own"
  on public.library_assets for delete using (auth.uid() = user_id);
