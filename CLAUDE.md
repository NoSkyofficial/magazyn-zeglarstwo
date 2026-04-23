# CLAUDE.md — Magazyn „ŻEGLARSTWO"

Guide for any AI agent working in this repo. Keep it in sync with reality as the
project evolves — update it whenever you establish a new convention, discover a
gotcha, or make an architectural decision worth remembering.

## Language conventions
- **Code** (identifiers, comments, JSDoc): English
- **UI strings** (user-facing text, labels, modals, emails): Polish — product language
- **Docs**: match the existing file's language when editing
  (CLAUDE.md is the English exception; a README in Polish stays Polish)

## Workflow
Before exploring the codebase or making changes, produce a concise plan (or ask
clarifying questions) in the first 1–2 messages. Do not read more than 5–10
files before presenting an approach.

## Dependencies
Always verify dependency compatibility before installing. Pin versions explicitly.
Install with `--legacy-peer-deps` (required by `next-auth@beta` + Next 16).

## Skills
Before writing any UI code, read the relevant skill file:
- **canvas-design** — `~/.claude/skills/canvas-design/SKILL.md`
  Fonts available at `~/.claude/skills/canvas-fonts/` — check which fonts exist
  before picking a typeface (don't assume Google Fonts availability).
- **frontend-design** — `~/.claude/skills/frontend-design/SKILL.md`
  Defines design tokens, component patterns, and environment constraints.

Reading these SKILL files is mandatory before the first UI line.

## Stack & known gotchas
- **Next.js 16.2.x** (App Router, TypeScript strict)
  - Middleware file is `proxy.ts` at project root — **not** `middleware.ts`
    (renamed in Next 16). Same API, same exports, new name.
  - Use `"use server"` / `"use client"` directives explicitly. Default to Server
    Components for reads; Client only for interactivity (forms, TipTap, dnd).
- **Tailwind CSS 4.x**
  - Config lives in `app/globals.css` via `@theme` (no `tailwind.config.ts` needed
    unless we opt in). Use CSS-first theme tokens.
  - PostCSS plugin is `@tailwindcss/postcss`, not `tailwindcss` directly.
- **Prisma 7.4.x**
  - SQLite file at `prisma/dev.db` (gitignored). Schema at `prisma/schema.prisma`.
  - Always run `npx prisma generate` after schema edits.
  - Use the singleton exported from `lib/prisma.ts` — never `new PrismaClient()`
    in app code (would leak connections on hot reload).
- **Auth.js v5 (next-auth@beta)**
  - Credentials provider, JWT session strategy (no DB adapter needed).
  - Config in `lib/auth.ts` exports `{ auth, handlers, signIn, signOut }`.
  - `proxy.ts` calls `auth()` to gate `/admin/*` routes.
- **TipTap 2.x** — stored as JSON (not HTML) in `PageContent.contentJson`.
  Render on the public side via `generateHTML()` from `@tiptap/html`.

## Project structure
```
app/
  (public)/layout.tsx        Nav + Footer shell
  (public)/page.tsx          One-page (force-dynamic — reads from DB)
  (public)/sections/         Hero, Magazine, Kiosk, Topics, Team, Contact
  admin/layout.tsx            Auth guard + sidebar + header
  admin/AdminSidebar.tsx      Client component (usePathname)
  admin/AdminHeader.tsx       Client component (signOut)
  admin/page.tsx              Dashboard with stats
  admin/issues/               List, new, [id]/edit + actions.ts
  admin/pages/                TipTap editor for rich-text pages + actions.ts
  admin/topics/               List, [id]/edit + actions.ts
  admin/team/                 List, new, [id]/edit + actions.ts
  admin/settings/             Publisher data + distributors + actions.ts
  api/auth/[...nextauth]/     Auth.js route handler
  api/upload/route.ts         File upload (auth-gated, mime + size validated)
components/
  Nav.tsx                     Scroll-spy sticky nav (Client)
  Footer.tsx                  Static footer
  admin/IssueForm.tsx         Cover upload form (Client — preview)
  tiptap/Editor.tsx           TipTap wrapper with toolbar (Client)
lib/
  auth.ts                     Auth.js config (Credentials + JWT)
  prisma.ts                   PrismaClient singleton with SQLite adapter
  upload.ts                   saveUpload() — validates mime/size, writes to public/uploads/
prisma/
  schema.prisma               Models: User, Issue, Topic, TeamMember, PageContent, Distributor, SiteSettings
  prisma.config.ts            Prisma 7 datasource config (url from env)
  seed.ts                     Full seed: admin, 9 topics, team, issue 9-10/2025, settings
proxy.ts                      Route guard for /admin/* (Next 16 name for middleware)
```

See `/app`, `/components`, `/lib`, `/prisma`. Key conventions:
- Route groups: `app/(public)/` for the one-page, `app/admin/` for CMS.
- Server actions live next to the page that uses them (`actions.ts`), not in `/lib`.
- Upload writes to `public/uploads/`; returned URLs are `/uploads/<subfolder>/<uuid>.ext`.
- Client components only where needed: Nav, AdminSidebar, AdminHeader, IssueForm, TipTap Editor.

## Design system
- **Fonts** (local, from `app/fonts/`): Italiana (wordmark/display), Gloock (editorial H2/H3), WorkSans (body)
- **Palette** (defined in `app/globals.css` `@theme`): navy-900 (#0A1628) background, paper (#F5F1E8) text, brass-400 (#D4A84A) accent
- **Utility classes**: `.section-label` (small caps labels), `.brass-rule` (thin gold line), `.prose-zeg` (TipTap rich text styles), `.input-field` (admin input base), `.grain` (noise texture pseudo-element), `.reveal` (fade-up animation)
- Tailwind 4 CSS-first config — no tailwind.config.ts; theme tokens in `@theme {}` block

## Database & migrations
- Dev flow: edit `schema.prisma` → `npx prisma migrate dev --name <desc>` →
  commit both schema and the generated migration folder.
- Seed: `npm run db:seed` runs `prisma/seed.ts` (creates admin from `.env`
  and seeds starter content — 9 Topics, Team, current Issue, Distributors, Settings).
- Reset dev DB: `npx prisma migrate reset` (re-runs seed automatically).

## Admin panel
- Single admin account, seeded from `ADMIN_EMAIL` + `ADMIN_PASSWORD` env vars.
- Route `/admin` is the dashboard; `/admin/login` is public.
- All other `/admin/*` routes are guarded by `proxy.ts`.
- CMS priorities: **Issues** (KIOSK) is the most-used surface — optimize that UX first.

## Environment
Copy `.env.example` to `.env` and fill in values. Required:
- `DATABASE_URL="file:./dev.db"`
- `AUTH_SECRET=` (generate with `openssl rand -base64 32`)
- `ADMIN_EMAIL=`
- `ADMIN_PASSWORD=` (plain — hashed on seed with bcrypt)

`.env` is gitignored; `.env.example` is committed.
