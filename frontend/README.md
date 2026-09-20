# Cobotics — Frontend

The web console for **Cobotics** — an open source Physical AI operations
intelligence platform that coordinates humans, robots, and AI agents to
understand, plan, execute, and optimize physical-world work. Built with
[Next.js](https://nextjs.org) 16 (App Router), React 19, TypeScript, and
Tailwind CSS v4, backed by Supabase.

- Live app: <https://cobotics.vercel.app>
- Part of the [Cobotics monorepo](https://github.com/opsenesai/cobotics)

## Tech Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** with shadcn / [Base UI](https://base-ui.com) components
- **Supabase** via `@supabase/ssr` and `@supabase/supabase-js`
- `framer-motion`, `react-markdown`, `shiki`, `sonner`, `lucide-react`

## Getting Started

1. Copy the environment template and fill in your Supabase values:

   ```bash
   cp .env.example .env.local
   ```

   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
   ```

2. Install dependencies and start the dev server:

   ```bash
   npm install
   npm run dev
   ```

   Open <http://localhost:3000>.

## Scripts

| Script          | Description                     |
| --------------- | ------------------------------- |
| `npm run dev`   | Start the development server    |
| `npm run build` | Production build                |
| `npm run start` | Serve the production build      |
| `npm run lint`  | Run ESLint                      |

## Project Structure

```
frontend/
├── app/                          # App Router
│   ├── auth/
│   │   ├── login/                # sign in
│   │   ├── signup/               # create account
│   │   ├── verify/               # email OTP verification
│   │   ├── forgot/               # request password reset
│   │   ├── reset/                # set a new password
│   │   ├── confirm/route.ts      # recovery/email link handler
│   │   └── layout.tsx
│   ├── console/                  # authenticated product area
│   │   ├── new/                  # new chat
│   │   │   └── [chatId]/         # a specific chat
│   │   ├── overview/
│   │   ├── recents/
│   │   ├── library/[assetId]/
│   │   ├── plugins/[connectorId]/
│   │   └── settings/             # account, usage, personalization, skills, memory
│   ├── legal/                    # privacy, terms, cookies
│   ├── layout.tsx
│   └── page.tsx                  # redirects to /auth/login
├── components/
│   ├── app/                      # app shell (header, footer, layout)
│   ├── console/                  # console shell (header, sidebar, layout)
│   ├── pages/console/            # per-page components (new/chat, settings, ...)
│   ├── shared/console/           # profile bar, theme/language toggles
│   └── ui/                       # shadcn / Base UI primitives
├── lib/
│   ├── supabase/                 # browser + server clients, session proxy
│   └── utils.ts
├── proxy.ts                      # Next.js 16 proxy — refreshes the Supabase session
├── public/                       # brand assets, icons
├── next.config.ts
├── tsconfig.json
└── package.json
```

## Authentication

Auth is handled by Supabase. The auth pages call the Supabase browser client
directly; `proxy.ts` (the Next.js 16 replacement for middleware) refreshes the
session on each request and guards the console. Email verification uses a
6-digit OTP; password recovery uses a link routed through `app/auth/confirm`.

## Deployment

Deployed on [Vercel](https://vercel.com) at <https://cobotics.vercel.app>. Set
`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in the
Vercel project environment.

---

Cobotics by [Opsenes](https://github.com/opsenesai).
