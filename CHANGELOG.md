# Changelog

All notable changes to this project are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Supabase integration across the monorepo: Auth, Database, and Storage.
  Frontend auth pages (login, signup, verify, forgot, reset) are wired to
  Supabase, with a Next.js 16 `proxy.ts` refreshing the session and an
  `app/auth/confirm` route handling recovery links.
- Backend Supabase project: `config.toml`, SQL migrations (`orgs`, `users`,
  `chats`, `messages` with row-level security, an auto-username signup
  trigger, and a private `user-uploads` bucket), and Edge Functions
  (`_shared`, `auth`, `chats`).
- Console UI: chat experience under `/console/new/[chatId]`, a profile bar
  with settings/personalization/feedback links and theme/language toggles,
  and brand assets (SVG wordmark logos, SVG favicon).

### Changed
- Root, frontend, and backend documentation refreshed to reflect the current
  structure, stack, and links (<https://cobotics.vercel.app>,
  <https://github.com/opsenesai/cobotics>).
- Reorganized repository into `frontend/` and `backend/` folders; moved all
  Next.js source files, configs, and dependencies into `frontend/`.
- Replaced the settings "Profile" section with "Account"; the sidebar now
  highlights the active page in the primary color.
- Increased the global border radius for smoother corners.

### Removed
- Deleted the previous `.git` repository (history reset).
