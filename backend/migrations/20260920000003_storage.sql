-- 20260920000003_storage.sql
-- One private bucket for user uploads. Files are namespaced by user id:
--   user-uploads/<user_id>/<path...>
-- RLS ensures each user can only touch objects under their own folder.

-- Create the bucket (private) ----------------------------------------------
insert into storage.buckets (id, name, public)
values ('user-uploads', 'user-uploads', false)
on conflict (id) do nothing;

-- Helper: the first path segment must equal the caller's user id.
-- storage.foldername(name) returns the path segments as a text[].

-- Read own files -----------------------------------------------------------
drop policy if exists "user_uploads_select_own" on storage.objects;
create policy "user_uploads_select_own"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'user-uploads'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Upload into own folder ---------------------------------------------------
drop policy if exists "user_uploads_insert_own" on storage.objects;
create policy "user_uploads_insert_own"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'user-uploads'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Update own files ---------------------------------------------------------
drop policy if exists "user_uploads_update_own" on storage.objects;
create policy "user_uploads_update_own"
  on storage.objects
  for update
  to authenticated
  using (
    bucket_id = 'user-uploads'
    and (storage.foldername(name))[1] = auth.uid()::text
  )
  with check (
    bucket_id = 'user-uploads'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Delete own files ---------------------------------------------------------
drop policy if exists "user_uploads_delete_own" on storage.objects;
create policy "user_uploads_delete_own"
  on storage.objects
  for delete
  to authenticated
  using (
    bucket_id = 'user-uploads'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
