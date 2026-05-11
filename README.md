# axelnova-templates

Full-stack mini-monorepo template for AxelNova tools and freelance projects.

Use this repo as a starting point ("Use this template" on GitHub) for any new project that needs **Nuxt 4 frontend + optional Laravel 11 API + optional Puppeteer PDF sidecar**, all wired together with Docker and GitHub Actions deploy to a Hostinger VPS.

## What's inside

```
.
├── apps/
│   ├── web/         Nuxt 4 + Tailwind 4 + TS strict + Pinia
│   ├── api/         Laravel 11 (API-only, token auth, no Sanctum) — bootstrap script
│   └── puppeteer/   Express + puppeteer sidecar for server-side PDF
├── docker-compose.yml          Dev — joins external axelnova-shared network
├── docker-compose.prod.yml     Prod overrides
├── .github/workflows/          build-check.yml (PR) + deploy.yml (push to main)
├── .env.example                Every env var the stack reads
└── docs/                       Reference docs and tool-specific scaffold prompts
```

## Quick start (new tool from this template)

```bash
# 1. On GitHub: click "Use this template" → create new repo
git clone git@github.com:byhaqie31/<your-new-repo>.git
cd <your-new-repo>

# 2. Claim ports from axelnova-infra/docs/port-allocation.md.
#    Tools range is 3010–3049 / 8010–8049. Update the registry in the same PR.

# 3. Make sure shared MySQL is running
cd ../axelnova-infra && docker compose up -d && cd -

# 4. Create the DB for this tool
bash ../axelnova-infra/scripts/new-project-db.sh <tool_slug>

# 5. Set up env
cp .env.example .env
# fill in PROJECT_SLUG, ports, DB_*, generate APP_KEY, set ADMIN_API_TOKEN

# 6. Bootstrap Laravel into apps/api/ (one-time, if you keep the API)
bash apps/api/bootstrap.sh

# 7. Boot the stack
docker compose up -d

# 8. Migrate
docker compose exec api php artisan migrate
```

URLs:
- Web → `http://localhost:${HOST_PORT_WEB}` (default 3010)
- API health → `http://localhost:${HOST_PORT_API}/api/health` (default 8010)

## Trimming what you don't need

For each app you delete, also remove its job from `.github/workflows/build-check.yml` and its service from both `docker-compose.yml` and `docker-compose.prod.yml`.

- **Frontend-only tool** → `rm -rf apps/api apps/puppeteer`, drop the `api` + `puppeteer` jobs from `build-check.yml`, remove both services from the compose files, drop API/puppeteer env vars from `.env.example`.
- **No PDF** → `rm -rf apps/puppeteer`, drop the `puppeteer` job from `build-check.yml`, remove the service from the compose files, drop `PUPPETEER_URL`.
- **No backend** → as above (frontend-only), and remove the `useApi` server-side branch.

## Conventions enforced

- Ports: `127.0.0.1` only (never `0.0.0.0`). Claim from infra registry first.
- Container names: `${PROJECT_SLUG}-{web,api,puppeteer}-{dev,prod}`.
- Network: joins `axelnova-shared` external network (declared in `axelnova-infra/docker-compose.yml`).
- No `@nuxtjs/tailwindcss` module. No `tailwind.config.ts`. Tailwind 4 via `@tailwindcss/vite` + CSS-first `@theme`.
- No Sanctum on the API. Token-only auth via `AdminTokenMiddleware`.
- No Redis in the template. Add only if a specific tool needs it.
- Chromium runs **only** in the puppeteer sidecar, never in the Laravel image.

## Docs

- [docs/PHASE-1-PROMPT.md](docs/PHASE-1-PROMPT.md) — original Quote Builder spec (preserved as reference; will move to its own repo when proposal-maker is spun up)

## Companion repo

[axelnova-infra](https://github.com/byhaqie31/axelnova-infra) — shared MySQL, port registry, project registry, DB-init scripts. **Read its `CLAUDE.md` before adding a new project.**
