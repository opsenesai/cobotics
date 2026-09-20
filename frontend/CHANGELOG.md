# Changelog

All notable changes to the frontend are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Supabase browser/server clients (`lib/supabase/`) and a Next.js 16 `proxy.ts`
  that refreshes the auth session and guards the console.
- Auth pages wired to Supabase: login, signup (with confirm password), 6-digit
  OTP verify, forgot, and reset, plus an `app/auth/confirm` route for recovery
  and email-confirmation links.
- Console chat UI under `/console/new` and `/console/new/[chatId]`.
- Profile bar with Settings, Personalization, and Feedback links, theme and
  language toggles, and section dividers.
- Brand assets: SVG wordmark logos in the app header and console sidebar, and
  an SVG favicon.

### Changed
- Replaced the settings "Profile" section with "Account"; the settings index
  now redirects to Account.
- Console sidebar highlights the active page in the primary color and no longer
  shows a Settings nav item (settings open from the profile bar).
- Increased the global border radius for smoother corners; auth form inputs use
  a uniform height.
- Reorganized repository into `frontend/` and `backend/` folders; moved all
  Next.js source files, configs, and dependencies into `frontend/`.

### Removed
- Deleted the existing `.git` repository (history reset).
