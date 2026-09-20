-- 20260920000008_plugins.sql
-- Per-user plugin/connector configuration. Owner-only via RLS.

create extension if not exists "pgcrypto";

create table if not exists public.plugins (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references auth.users (id) on delete cascade,
  org_id        uuid references public.orgs (id) on delete set null,
  connector_id  text not null,
  name          text,
  enabled       boolean not null default false,
  config        jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  constraint plugins_user_connector_key unique (user_id, connector_id)
);

comment on table public.plugins is 'Per-user plugin/connector configuration.';

create index if not exists plugins_user_id_idx on public.plugins (user_id);

drop trigger if exists plugins_set_updated_at on public.plugins;
create trigger plugins_set_updated_at
  before update on public.plugins
  for each row execute function public.set_updated_at();

alter table public.plugins enable row level security;

drop policy if exists "plugins_select_own" on public.plugins;
create policy "plugins_select_own"
  on public.plugins for select using (auth.uid() = user_id);

drop policy if exists "plugins_insert_own" on public.plugins;
create policy "plugins_insert_own"
  on public.plugins for insert with check (auth.uid() = user_id);

drop policy if exists "plugins_update_own" on public.plugins;
create policy "plugins_update_own"
  on public.plugins for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "plugins_delete_own" on public.plugins;
create policy "plugins_delete_own"
  on public.plugins for delete using (auth.uid() = user_id);
