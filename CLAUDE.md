# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project purpose

Social Art is a demo app built as a sandbox for AI-agent "skills". The functional base is an art exploration platform (login, browse artworks from the Art Institute of Chicago API, favorite pieces). See `AGENTS.md` for the agent-focused roadmap — it lists the intended build order and conventions and should be treated as complementary to this file.

## Commands

Runtime/package manager is **Bun**. Always use `bun --bun` for dev/build so Vite runs under Bun.

```bash
bun install              # install deps
bun --bun run dev        # dev server on :3000
bun --bun run build      # production build
bun --bun run preview    # preview build

bun run test             # vitest run (one-shot)
bunx vitest <pattern>    # run a single test file / pattern
bunx vitest --watch      # watch mode

bun run lint             # eslint
bun run format           # prettier --check
bun run check            # prettier --write + eslint --fix (use before commit)

bun run db:generate      # drizzle-kit generate (after schema.ts changes)
bun run db:migrate       # apply migrations
bun run db:push          # push schema to DB (dev shortcut)
bun run db:studio        # Drizzle Studio
```

Local Postgres: `docker compose up -d` (defined in `docker-compose.yml`, exposes :5432, DB `social-art`, user/pass `postgres`). `.env.local` holds `DATABASE_URL`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`.

## Architecture

**TanStack Start (SSR React) + Vite + Nitro.** The server and client are one app. `vite.config.ts` composes the `tanstackStart` plugin with `nitro`, `tailwindcss`, `viteReact`, and `tsconfigPaths`.

**Routing is file-based.** `src/routes/` is scanned by `@tanstack/router-plugin` and generates [src/routeTree.gen.ts](src/routeTree.gen.ts) — do not edit that file by hand. The root shell is [src/routes/__root.tsx](src/routes/__root.tsx), which wires a `QueryClientProvider` (`@tanstack/react-query`) and devtools. `getRouter()` in [src/router.tsx](src/router.tsx) is what Start consumes.

**Import alias:** `@/*` → `src/*` (defined in `tsconfig.json`). Use it consistently; avoid the `#/*` alias from `package.json#imports` — it's not what the existing code uses.

**Three kinds of server code — pick the right one:**

1. **Server functions** (`createServerFn` from `@tanstack/react-start`) — live in `src/api/*.function.ts` (e.g. [src/api/art.function.ts](src/api/art.function.ts)). Use for RPC-style calls from client components. Validate input with `.inputValidator(zodSchema)`. For any mutation, auth-check inside the handler before touching the DB.
2. **API route handlers** — file routes under `src/routes/api/` that export `server: { handlers: { GET, POST, ... } }`. Currently only the Better Auth catch-all at [src/routes/api/auth/$.ts](src/routes/api/auth/$.ts).
3. **Loaders / actions** on regular routes — for data the page needs on load.

**Auth — Better Auth + Drizzle.** Server instance in [src/lib/auth.ts](src/lib/auth.ts) uses `drizzleAdapter(db, { provider: 'pg' })` and the `tanstackStartCookies()` plugin. Client is [src/lib/auth-client.ts](src/lib/auth-client.ts) (`createAuthClient` from `better-auth/react`). All auth HTTP traffic goes through the catch-all at `/api/auth/$` which delegates to `auth.handler(request)`. Email+password is enabled; social providers are not configured.

**Database — Drizzle ORM over node-postgres.** Client in [src/db/index.ts](src/db/index.ts), schema in [src/db/schema.ts](src/db/schema.ts). Current tables: `user`, `session`, `account`, `verification` (Better Auth's standard shape). The `favorites` table from the roadmap in [AGENTS.md](AGENTS.md) is **not yet implemented** — add it to `schema.ts` and run `db:generate` + `db:migrate` when building that feature. Migrations live in `drizzle/`.

**UI — shadcn/ui + Tailwind v4.** Config in `components.json` — style `new-york`, base color `zinc`, icon lib `lucide`. Components land under `src/components/ui/`; auth-specific forms under `src/components/auth/`. Tailwind is loaded via `@tailwindcss/vite`; the single CSS entry is [src/styles.css](src/styles.css). Don't introduce custom CSS files — compose utilities and shadcn primitives. Class-merging helper is `cn` in [src/lib/utils.ts](src/lib/utils.ts).

**Forms** use `@tanstack/react-form` with `@tanstack/zod-form-adapter`; shared zod schemas live in `src/helpers/zod/`.

**External art API** is `https://api.artic.edu/api/v1/artworks` — fetched server-side only via `artServerFn`. Response types in [src/types/art-api.ts](src/types/art-api.ts).

## Conventions

- When adding a server function that writes to the DB, verify the session via Better Auth inside the handler before the mutation. Never trust the client for identity.
- After editing `src/db/schema.ts`, regenerate migrations (`bun run db:generate`) and commit the SQL in `drizzle/` with the schema change.
- Don't hand-edit `src/routeTree.gen.ts` — it's produced by the router plugin on dev/build.
- Prefer shadcn primitives (`bunx shadcn@latest add <component>`) over bespoke components; the generator respects `components.json`.
