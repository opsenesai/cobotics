-- 20260920000002_database.sql
-- Row-level security so a user can only ever read or write their own data.
-- Isolation key: auth.uid() = profiles.user_id.

alter table public.profiles enable row level security;

-- Read own profile (fetch by user_id) --------------------------------------
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles
  for select
  using (auth.uid() = user_id);

-- Insert own profile (the signup trigger runs as definer; this covers
-- any client-side insert for the authenticated user only) -----------------
drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles
  for insert
  with check (auth.uid() = user_id);

-- Update own profile. user_id and org_id are immutable; only mutable
-- fields (e.g. username) may change. ---------------------------------------
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Prevent changing the identity columns via a guard trigger ----------------
create or replace function public.profiles_lock_identity()
returns trigger
language plpgsql
as $$
begin
  if new.user_id <> old.user_id then
    raise exception 'user_id is immutable';
  end if;
  if new.org_id <> old.org_id then
    raise exception 'org_id is immutable';
  end if;
  return new;
end;
$$;

drop trigger if exists profiles_lock_identity on public.profiles;
create trigger profiles_lock_identity
  before update on public.profiles
  for each row
  execute function public.profiles_lock_identity();
