-- 20260920000006_memory.sql
-- Per-user memory entries. Owner-only via RLS.

create extension if not exists "pgcrypto";

create table if not exists public.memories (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  org_id      uuid references public.orgs (id) on delete set null,
  content     text not null,
  kind        text not null default 'note',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.memories is 'Per-user saved memory entries.';

create index if not exists memories_user_id_idx on public.memories (user_id);

drop trigger if exists memories_set_updated_at on public.memories;
create trigger memories_set_updated_at
  before update on public.memories
  for each row execute function public.set_updated_at();

alter table public.memories enable row level security;

drop policy if exists "memories_select_own" on public.memories;
create policy "memories_select_own"
  on public.memories for select using (auth.uid() = user_id);

drop policy if exists "memories_insert_own" on public.memories;
create policy "memories_insert_own"
  on public.memories for insert with check (auth.uid() = user_id);

drop policy if exists "memories_update_own" on public.memories;
create policy "memories_update_own"
  on public.memories for update
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "memories_delete_own" on public.memories;
create policy "memories_delete_own"
  on public.memories for delete using (auth.uid() = user_id);
