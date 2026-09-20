-- 20260920000004_chats.sql
-- Chats (and their messages) owned by a single user. A chat is saved with its
-- own chat id + the owner's user_id. RLS ensures only the owner can access.

create extension if not exists "pgcrypto";

-- Chats --------------------------------------------------------------------
create table if not exists public.chats (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users (id) on delete cascade,
  org_id      uuid references public.orgs (id) on delete set null,
  title       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.chats is 'Conversations owned by a single user.';

create index if not exists chats_user_id_idx on public.chats (user_id);

-- Messages -----------------------------------------------------------------
create table if not exists public.messages (
  id          uuid primary key default gen_random_uuid(),
  chat_id     uuid not null references public.chats (id) on delete cascade,
  user_id     uuid not null references auth.users (id) on delete cascade,
  role        text not null check (role in ('user', 'assistant', 'system')),
  content     text not null default '',
  created_at  timestamptz not null default now()
);

comment on table public.messages is 'Messages belonging to a chat.';

create index if not exists messages_chat_id_idx on public.messages (chat_id);

-- Keep chats.updated_at fresh ----------------------------------------------
-- (public.set_updated_at() is defined in the auth migration.)
drop trigger if exists chats_set_updated_at on public.chats;
create trigger chats_set_updated_at
  before update on public.chats
  for each row execute function public.set_updated_at();

-- Bump the parent chat's updated_at when a message is added ----------------
create or replace function public.touch_chat_on_message()
returns trigger
language plpgsql
as $$
begin
  update public.chats set updated_at = now() where id = new.chat_id;
  return new;
end;
$$;

drop trigger if exists messages_touch_chat on public.messages;
create trigger messages_touch_chat
  after insert on public.messages
  for each row execute function public.touch_chat_on_message();

-- Row-level security: owner-only ------------------------------------------
alter table public.chats enable row level security;
alter table public.messages enable row level security;

-- chats
drop policy if exists "chats_select_own" on public.chats;
create policy "chats_select_own"
  on public.chats for select
  using (auth.uid() = user_id);

drop policy if exists "chats_insert_own" on public.chats;
create policy "chats_insert_own"
  on public.chats for insert
  with check (auth.uid() = user_id);

drop policy if exists "chats_update_own" on public.chats;
create policy "chats_update_own"
  on public.chats for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "chats_delete_own" on public.chats;
create policy "chats_delete_own"
  on public.chats for delete
  using (auth.uid() = user_id);

-- messages: owner-only, and the message must belong to the caller's chat
drop policy if exists "messages_select_own" on public.messages;
create policy "messages_select_own"
  on public.messages for select
  using (auth.uid() = user_id);

drop policy if exists "messages_insert_own" on public.messages;
create policy "messages_insert_own"
  on public.messages for insert
  with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.chats c
      where c.id = messages.chat_id and c.user_id = auth.uid()
    )
  );

drop policy if exists "messages_delete_own" on public.messages;
create policy "messages_delete_own"
  on public.messages for delete
  using (auth.uid() = user_id);
