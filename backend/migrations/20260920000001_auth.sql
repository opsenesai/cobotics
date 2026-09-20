-- 20260920000001_auth.sql
-- Auth foundation: a profile row for every authenticated user.
-- Supabase Auth owns auth.users; this adds app-level identity data.
--
-- Requirements:
--   * user_id  — UUID, references auth.users, primary key (unique)
--   * org_id   — UUID, unique per user (1:1 user<->org tenancy)
--   * username — auto-assigned on signup, unique, editable later

create extension if not exists "pgcrypto";

-- Profiles -----------------------------------------------------------------
create table if not exists public.profiles (
  user_id     uuid primary key references auth.users (id) on delete cascade,
  org_id      uuid not null default gen_random_uuid(),
  username    text not null,
  email       text,
  full_name   text,
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  constraint profiles_org_id_key unique (org_id),
  constraint profiles_username_key unique (username),
  constraint profiles_username_format
    check (char_length(username) between 3 and 32)
);

comment on table public.profiles is
  'Per-user profile. user_id = auth.users.id; org_id is unique per user (single-user tenant).';

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

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row
  execute function public.set_updated_at();

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
  -- Normalise: lowercase, keep [a-z0-9_], collapse the rest.
  base := lower(regexp_replace(coalesce(split_part(seed, '@', 1), 'user'),
                               '[^a-z0-9_]', '', 'g'));
  if char_length(base) < 3 then
    base := 'user';
  end if;
  base := left(base, 24);

  -- Append a short random hex suffix until unique.
  loop
    candidate := base || '_' || substr(encode(gen_random_bytes(3), 'hex'), 1, 4);
    exit when not exists (select 1 from public.profiles p where p.username = candidate);
  end loop;

  return candidate;
end;
$$;

-- Create a profile automatically when a new auth user signs up -------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (user_id, username, email, full_name, avatar_url)
  values (
    new.id,
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
  for each row
  execute function public.handle_new_user();
