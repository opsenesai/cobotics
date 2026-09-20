# Cobotics

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**Cobotics by Opsenes** is an open source Physical AI operations intelligence
platform that coordinates humans, robots, and AI agents to understand, plan,
execute, and optimize physical-world work.

This is the monorepo for the Cobotics web console and its Supabase backend
(Auth, Database, Storage).

- Live app: <https://cobotics.vercel.app>
- Repository: <https://github.com/opsenesai/cobotics>
- Maintained by [Opsenes](https://github.com/opsenesai)

## Project Structure

```
cobotics/
├── frontend/                 # Next.js web application
│   ├── app/                  # App Router routes
│   │   ├── auth/             # login, signup, verify, forgot, reset, confirm
│   │   ├── console/          # authenticated product area
│   │   │   ├── new/[chatId]/ # chat
│   │   │   ├── overview/     # recents, library, plugins, settings, ...
│   │   │   └── settings/     # account, usage, personalization, skills, memory
│   │   └── legal/            # privacy, terms, cookies
│   ├── components/           # UI, app shell, console shell, page components
│   ├── lib/supabase/         # Supabase browser/server clients + session proxy
│   ├── proxy.ts              # Next.js 16 proxy (session refresh)
│   └── public/               # static assets (brand, icons)
├── backend/                  # Supabase project (Auth + Database + Storage)
│   ├── config.toml           # Supabase CLI configuration
│   ├── migrations/           # SQL schema + RLS
│   └── functions/            # Edge Functions (_shared, auth, chats)
├── README.md
├── LICENSE
├── SECURITY.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── ROADMAP.md
├── .env.example
└── .gitignore
```

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4,
  shadcn / Base UI components.
- **Backend:** Supabase — Postgres with row-level security, Auth, Storage, and
  Edge Functions.

## Getting Started

### Prerequisites

- Node.js (LTS recommended) and npm
- A [Supabase](https://supabase.com) project (for Auth/Database/Storage)

### Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/opsenesai/cobotics.git
   cd cobotics
   ```

2. Configure environment variables. Copy `.env.example` to `.env.local` and
   fill in your Supabase values:

   ```bash
   cp .env.example .env.local
   ```

   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
   ```

3. Install and run the frontend:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   Open <http://localhost:3000>.

4. (Optional) Apply the database schema with the [Supabase CLI](https://supabase.com/docs/guides/local-development)
   from `backend/` (see [`backend/README.md`](backend/README.md)).

## Contributing

Contributions are welcome! Please read the [Contributing Guide](CONTRIBUTING.md)
and our [Code of Conduct](CODE_OF_CONDUCT.md) before getting started.

## Documentation

- [Frontend](frontend/README.md)
- [Backend](backend/README.md)
- [Contributing](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)
- [Roadmap](ROADMAP.md)
- [Changelog](CHANGELOG.md)

## License

Licensed under the [Apache License 2.0](LICENSE).

---

Cobotics by [Opsenes](https://github.com/opsenesai).
