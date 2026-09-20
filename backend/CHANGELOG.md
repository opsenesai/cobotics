# Changelog

All notable changes to the backend are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Supabase project scaffolding: `config.toml` (auth, database, storage) and
  a Supabase-oriented `.env.example`.
- Migrations:
  - `20260920000001_auth.sql` — `orgs` and `users` tables (1:1 user↔org),
    a signup trigger that creates the org and user, and an auto-generated,
    editable username.
  - `20260920000002_database.sql` — row-level security policies (owner-only)
    and an identity-lock trigger on `users`.
  - `20260920000003_storage.sql` — private `user-uploads` bucket with
    per-user folder RLS.
  - `20260920000004_chats.sql` — `chats` and `messages` tables with
    owner-only RLS and an `updated_at` touch trigger.
- Edge Functions: `_shared` (CORS + Supabase client helpers), `auth`
  (profile fetch/update by `user_id`), and `chats` (chats + messages CRUD).

### Fixed
- `generate_username` now uses `gen_random_uuid()` for the random suffix
  instead of `gen_random_bytes()`, which is not on the function's
  `search_path` and caused signup to fail with a 500.

### Changed
- Split the initial single `profiles` table into `users` + `orgs`.
