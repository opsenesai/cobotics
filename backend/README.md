# Cobotics — Backend

The Cobotics backend is a [Supabase](https://supabase.com) project providing
**Auth**, **Database** (Postgres), and **Storage**. There is no standalone
server process — the API surface is Supabase's auto-generated REST/client APIs
(consumed from [`../frontend`](../frontend)) plus Edge Functions for custom
server-side logic.

Part of the [Cobotics monorepo](https://github.com/opsenesai/cobotics) —
Opsenes' open source Physical AI operations intelligence platform.

## Structure

```
backend/
├── config.toml                    # Supabase CLI configuration (auth, db, storage)
├── migrations/                    # SQL schema + row-level security
│   ├── 20260920000001_auth.sql     # orgs + users tables, signup trigger, auto username
│   ├── 20260920000002_database.sql # RLS policies + identity-lock trigger
│   ├── 20260920000003_storage.sql  # user-uploads bucket + per-user RLS
│   └── 20260920000004_chats.sql    # chats + messages tables, RLS
├── functions/                     # Edge Functions (Deno)
│   ├── _shared/                    # shared CORS + Supabase client helpers
│   ├── auth/                       # profile fetch/update (by user_id)
│   └── chats/                      # chats + messages CRUD (owner-only)
├── .env.example
└── README.md
```

## Data Model

| Table      | Purpose                                                    |
| ---------- | ---------------------------------------------------------- |
| `orgs`     | Tenant/organization — one org per user (1:1)               |
| `users`    | Profile linked to `auth.users`; unique `org_id`, `username`|
| `chats`    | Conversations owned by a single user                       |
| `messages` | Messages belonging to a chat                               |

Storage bucket: **`user-uploads`** (private; files namespaced by `user_id`).

Every table has row-level security so a user can only access their own rows.
On signup, a trigger creates the user's org, then a `users` row with an
auto-generated, editable username.

## Getting Started

Requires the [Supabase CLI](https://supabase.com/docs/guides/local-development)
and Docker.

1. Copy the environment template and fill in values from your Supabase project
   (Project Settings > API):

   ```bash
   cp .env.example .env.local
   ```

2. Start the local stack and apply migrations:

   ```bash
   supabase start
   supabase db reset      # applies migrations in order
   ```

3. Serve Edge Functions locally:

   ```bash
   supabase functions serve
   ```

To push schema to the linked remote project:

```bash
supabase db push
```

## Security Notes

- The **service role key** bypasses row-level security and must stay
  server-side only. Never expose it to the browser or commit real values.
- The **publishable (anon) key** is safe for the browser and is used by the
  frontend.

---

Cobotics by [Opsenes](https://github.com/opsenesai).
