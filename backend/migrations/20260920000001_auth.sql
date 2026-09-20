-- 20260920000001_auth.sql
-- Auth foundation with a 1:1 user <-> org model.
-- Supabase Auth owns auth.users; this adds app-level identity data.
--
--   orgs.id       — UUID, primary key (one org per user)
--   users.user_id — UUID, references auth.users, primary key (unique)
--   users.org_id  — UUID, references orgs, unique (1:1 user<->org)
--   users.username— auto-assigned on signup, unique, editable later

create extension if not exists "pgcrypto";

-- Orgs ---------------------------------------------------------------------
create table if not exists public.orgs (
  id          uuid primary key default gen_random_uuid(),
  name        text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.orgs is 'Tenant/organization. One org per user (1:1).';

-- Users --------------------------------------------------------------------
create table if not exists public.users (
  user_id     uuid primary key references auth.users (id) on delete cascade,
  org_id      uuid not null references public.orgs (id) on delete cascade,
  username    text not null,
  email       text,
  full_name   text,
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint users_org_id_key unique (org_id),        -- 1:1 user <-> org
  constraint users_username_key unique (username),
  constraint users_username_format
    check (char_length(username) between 3 and 32)
);

comment on table public.users is
  'Per-user profile. user_id = auth.users.id; org_id is unique (single-user org).';

create index if not exists users_org_id_idx on public.users (org_id);

-- Keep updated_at fresh ----------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists orgs_set_updated_at on public.orgs;
create trigger orgs_set_updated_at
  before update on public.orgs
  for each row execute function public.set_updated_at();

drop trigger if exists users_set_updated_at on public.users;
create trigger users_set_updated_at
  before update on public.users
  for each row execute function public.set_updated_at();

-- Auto-assign a unique username derived from the email local part ----------
create or replace function public.generate_username(seed text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  base      text;
  candidate text;
begin
  base := lower(regexp_replace(coalesce(split_part(seed, '@', 1), 'user'),
                               '[^a-z0-9_]', '', 'g'));
  if char_length(base) < 3 then
    base := 'user';
  end if;
  base := left(base, 24);

  loop
    -- gen_random_uuid() is always available; gen_random_bytes() lives in the
    -- extensions schema and isn't on this function's search_path.
    candidate := base || '_' || substr(replace(gen_random_uuid()::text, '-', ''), 1, 4);
    exit when not exists (select 1 from public.users u where u.username = candidate);
  end loop;

  return candidate;
end;
$$;

-- On signup: create the user's org, then the user linked to it -------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  new_org_id uuid;
begin
  insert into public.orgs (name)
  values (coalesce(new.raw_user_meta_data ->> 'full_name', new.email))
  returning id into new_org_id;

  insert into public.users (user_id, org_id, username, email, full_name, avatar_url)
  values (
    new.id,
    new_org_id,
    public.generate_username(new.email),
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (user_id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
