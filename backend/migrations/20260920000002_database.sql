-- 20260920000002_database.sql
-- Row-level security so a user can only ever read or write their own data.
-- Isolation key: auth.uid() = users.user_id. Each user sees only their org.

alter table public.users enable row level security;
alter table public.orgs enable row level security;

-- users: owner-only (fetch by user_id) ------------------------------------
drop policy if exists "users_select_own" on public.users;
create policy "users_select_own"
  on public.users for select
  using (auth.uid() = user_id);

drop policy if exists "users_insert_own" on public.users;
create policy "users_insert_own"
  on public.users for insert
  with check (auth.uid() = user_id);

drop policy if exists "users_update_own" on public.users;
create policy "users_update_own"
  on public.users for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- orgs: a user can access only the org they belong to ----------------------
drop policy if exists "orgs_select_member" on public.orgs;
create policy "orgs_select_member"
  on public.orgs for select
  using (
    exists (
      select 1 from public.users u
      where u.org_id = orgs.id and u.user_id = auth.uid()
    )
  );

drop policy if exists "orgs_update_member" on public.orgs;
create policy "orgs_update_member"
  on public.orgs for update
  using (
    exists (
      select 1 from public.users u
      where u.org_id = orgs.id and u.user_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.users u
      where u.org_id = orgs.id and u.user_id = auth.uid()
    )
  );

-- Keep identity columns immutable on users --------------------------------
create or replace function public.users_lock_identity()
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

drop trigger if exists users_lock_identity on public.users;
create trigger users_lock_identity
  before update on public.users
  for each row execute function public.users_lock_identity();
