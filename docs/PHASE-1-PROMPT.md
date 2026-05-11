# Claude Code Prompt — Axel Nova Tools (Quote Builder MVP)

> Paste into a fresh Claude Code session. Run in **Plan Mode** first, approve the proposed file tree, then execute.

---

## Context

You are scaffolding **`axelnova-tools`** at `/Users/BHQIMBP14/Developer/axelnova-tools/` — a multi-tool hub for Axel Nova (developer brand of Ahmad Baihaqie / Qie), to be hosted at `tools.axelnova.tech` on a Hostinger VPS.

The first tool is **Quote Builder**: a proposal generator that produces both a shareable web view and a server-rendered PDF. It is the *outbound* counterpart to `axelnova-dashboard`'s existing `/admin/quotations/` (which captures *inbound* client quote requests). The two apps are independent — they share MySQL from `axelnova-infra` but nothing else.

Repo also needs to host **future tools** (JSONLab, API Vault, …) so build the hub shell, not just the quote tool in isolation.

---

## Decisions already locked — do not second-guess

1. **Auth.** Single-user MVP. No Sanctum, no login flow. A static `ADMIN_API_TOKEN` env var + a tiny middleware checking `Authorization: Bearer …` on protected routes. Frontend stores the token in `localStorage` after a one-field "paste token" page.
2. **Database.** New `axelnova_tools_db` on the shared MySQL instance in `axelnova-infra`. Tools' Laravel container reaches it via hostname `mysql:3306` over the `axelnova-shared` external Docker network.
3. **Redis.** Not required for Phase 1 — Laravel uses file/database cache and sync queue driver. **Do not** add a redis service to `docker-compose.yml` and **do not** set `REDIS_HOST` in the API env. (Note: `axelnova-infra/docker-compose.yml` currently has no redis service either; add one there before wiring it here.)
4. **Ports (dev).** Web → **3004**, API → **8004**, puppeteer sidecar → **internal only** (no host port).
5. **PDF generation.** Separate `puppeteer` sidecar service (Node + Express + Chromium). Laravel posts the render URL to it over the internal network and gets PDF bytes back. **Do not** install Chromium inside the Laravel container.
6. **Dashboard integration.** One-way deep link only. Dashboard's quote-request detail page will (later) add an "Open in Quote Builder" button that opens `tools.axelnova.tech/quote/new?prefill=<base64-json>`. Tools decodes the blob and pre-fills the form. **No** shared session, **no** SSO, **no** API call between apps in Phase 1.
7. **Domain.** `tools.axelnova.tech`. Hostinger DNS (not Cloudflare). `axelnova.tech` root is empty — leave it alone.

---

## Tech stack (locked)

**Frontend** — Nuxt 4 (default `app/` dir, no manual conversion), Tailwind CSS 4 (CSS-first `@theme`, `@tailwindcss/vite` plugin via Nuxt's `vite` hook, **no** `tailwind.config.ts`, **no** `@nuxtjs/tailwindcss` module), Pinia, TypeScript strict, `@vueuse/core`, `lucide-vue-next`.

**Backend** — Laravel 11 (API only), `spatie/laravel-data`, MySQL 8.0 (shared). **No** Sanctum. **No** Redis in Phase 1. **No** Browsershot in Phase 1 (PDF goes via the sidecar — see §5).

**Puppeteer sidecar** — Node 22 + Express + `puppeteer` package (bundles Chromium). One endpoint: `POST /render { url } → application/pdf`.

**Infra** — Docker Compose joins existing `axelnova-shared` external network. Multi-stage Dockerfiles. Designed for GitHub Actions deploy to the existing Hostinger VPS.

---

## Repo structure

```
axelnova-tools/
├── apps/
│   ├── web/                              # Nuxt 4
│   │   ├── app/
│   │   │   ├── app.vue
│   │   │   ├── layouts/
│   │   │   │   ├── default.vue           # Hub shell (nav + footer)
│   │   │   │   ├── quote.vue             # Builder layout
│   │   │   │   └── print.vue             # Minimal layout used by /q/[shareId] — no nav, no footer
│   │   │   ├── pages/
│   │   │   │   ├── index.vue             # Hub landing
│   │   │   │   ├── login.vue             # Single field: admin token
│   │   │   │   ├── quote/
│   │   │   │   │   ├── index.vue         # My quotes list
│   │   │   │   │   ├── new.vue           # Builder
│   │   │   │   │   └── [id].vue          # Edit
│   │   │   │   └── q/
│   │   │   │       └── [shareId].vue     # Public read-only view
│   │   │   ├── components/
│   │   │   │   ├── ui/                   # Button, Input, Card, Pill
│   │   │   │   ├── hub/                  # ToolCard, HubNav
│   │   │   │   └── quote/
│   │   │   │       ├── builder/          # ClientInfoForm, ProjectInfoForm, PackageEditor, BenefitsEditor, TechStackEditor
│   │   │   │       └── preview/          # QuotePreview, QuoteHeader, ProblemStatement, PackageCard, AudienceBenefits, TechStackPills, QuoteFooter
│   │   │   ├── stores/
│   │   │   │   ├── auth.ts               # token in localStorage
│   │   │   │   └── quote-builder.ts
│   │   │   ├── composables/
│   │   │   │   ├── useApi.ts             # injects Bearer header from auth store
│   │   │   │   ├── useI18n.ts            # en/ms toggle
│   │   │   │   └── useQuote.ts
│   │   │   ├── middleware/
│   │   │   │   └── auth.global.ts        # redirects to /login if no token, except /q/* and /login
│   │   │   ├── types/
│   │   │   │   ├── quote.ts
│   │   │   │   └── api.ts
│   │   │   └── utils/
│   │   │       ├── currency.ts
│   │   │       └── slugify.ts
│   │   ├── assets/css/main.css           # @import "tailwindcss"; + @theme block
│   │   ├── public/
│   │   ├── i18n/
│   │   │   ├── en.json
│   │   │   └── ms.json
│   │   ├── nuxt.config.ts                # @tailwindcss/vite plugin wired here via the `vite` hook
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── Dockerfile
│   │
│   ├── api/                              # Laravel 11
│   │   ├── app/
│   │   │   ├── Http/
│   │   │   │   ├── Controllers/Api/
│   │   │   │   │   ├── HealthController.php
│   │   │   │   │   ├── QuoteController.php
│   │   │   │   │   ├── QuotePdfController.php
│   │   │   │   │   └── PublicQuoteController.php
│   │   │   │   ├── Middleware/
│   │   │   │   │   └── AdminTokenMiddleware.php
│   │   │   │   └── Requests/
│   │   │   │       ├── StoreQuoteRequest.php
│   │   │   │       └── UpdateQuoteRequest.php
│   │   │   ├── Models/
│   │   │   │   └── Quote.php             # uses HasUuids
│   │   │   ├── Data/                     # spatie/laravel-data
│   │   │   │   ├── QuoteData.php
│   │   │   │   ├── PackageData.php
│   │   │   │   └── ClientData.php
│   │   │   └── Services/
│   │   │       └── QuotePdfService.php   # HTTP client → puppeteer sidecar
│   │   ├── database/migrations/
│   │   │   ├── 0001_01_01_000000_create_users_table.php       # default L11
│   │   │   ├── 0001_01_01_000001_create_cache_table.php
│   │   │   ├── 0001_01_01_000002_create_jobs_table.php
│   │   │   └── 2026_05_11_000000_create_quotes_table.php
│   │   ├── routes/api.php
│   │   ├── config/
│   │   ├── composer.json
│   │   └── Dockerfile
│   │
│   └── puppeteer/                        # Sidecar
│       ├── src/server.ts                 # Express + puppeteer; POST /render
│       ├── package.json
│       ├── tsconfig.json
│       └── Dockerfile
│
├── docker-compose.yml                    # web, api, puppeteer — no mysql, no redis
├── docker-compose.prod.yml
├── .github/workflows/deploy.yml
├── nginx/tools.axelnova.tech.conf
├── .env.example
├── README.md
└── .gitignore
```

---

## Phase 1 — Scaffold

### 1. Nuxt 4 frontend (`apps/web/`)

- `npx nuxi@latest init apps/web` — Nuxt 4's default scaffold already uses the `app/` directory. **No conversion step.**
- Install: `pinia @pinia/nuxt @vueuse/core @vueuse/nuxt lucide-vue-next tailwindcss @tailwindcss/vite`.
- **Do not** install `@nuxtjs/tailwindcss`.
- `nuxt.config.ts`: strict TS, modules `['@pinia/nuxt','@vueuse/nuxt']`, hook the Tailwind Vite plugin via the `vite` config, and expose **two** API bases — one server-only for SSR fetches and one public for the browser:
  ```ts
  import tailwindcss from '@tailwindcss/vite'
  export default defineNuxtConfig({
    typescript: { strict: true },
    modules: ['@pinia/nuxt', '@vueuse/nuxt'],
    vite: { plugins: [tailwindcss()] },
    css: ['~/assets/css/main.css'],
    runtimeConfig: {
      apiBaseInternal: '',                          // NUXT_API_BASE_INTERNAL — used by SSR (e.g. http://api:8000)
      public: {
        apiBase: '',                                // NUXT_PUBLIC_API_BASE — used by the browser (e.g. http://localhost:8004)
      },
    },
  })
  ```
  `useApi.ts` must pick `apiBaseInternal` when `import.meta.server`, otherwise `public.apiBase`. The public quote page is SSR-rendered by puppeteer hitting `http://web:3000/q/{shareId}` — without an internal base, that SSR fetch tries to reach `localhost:8004` from inside the `web` container and dies.
- `assets/css/main.css`:
  ```css
  @import "tailwindcss";

  @theme {
    --color-brand-50:  oklch(0.97 0.01 250);
    --color-brand-500: oklch(0.55 0.18 250);
    --color-brand-700: oklch(0.42 0.20 250);
    --color-ink:       oklch(0.20 0.01 250);
    --color-paper:     oklch(0.99 0.005 80);
    --font-display: "Inter Tight", system-ui, sans-serif;
    --font-sans:    "Inter", system-ui, sans-serif;
  }
  ```

### 2. Tools hub shell

- `pages/index.vue`: tool card grid showing **Quote Builder** (active → `/quote`), **JSONLab** (soon), **API Vault** (soon). **Public** — no token required to view; cards link to admin-gated routes which the middleware then guards.
- `layouts/default.vue`: minimal top nav (`axelnova / tools` wordmark left, theme toggle + token-status right), footer with `baihaqie.com · axelnova.tech`.
- `layouts/print.vue`: just `<slot />` inside a `min-h-screen bg-paper text-ink` wrapper. `/q/[shareId].vue` calls `definePageMeta({ layout: 'print' })`.
- `middleware/auth.global.ts` allowlist (no token required): `/`, `/login`, `/q/*`. Everything else (`/quote/*`, future tool routes) redirects to `/login` if `localStorage.adminToken` is empty.
- Aesthetic: paper bg, ink text, generous whitespace, single accent (`brand-500`), no borders unless essential.

### 3. Quote types (`apps/web/app/types/quote.ts`)

```ts
export type Language     = 'en' | 'ms'
export type QuoteStatus  = 'draft' | 'sent' | 'accepted' | 'expired'
export type PackageColor = 'green' | 'blue' | 'purple' | 'amber'

export interface ClientInfo  { name: string; company: string; email?: string; address?: string; logoUrl?: string }
export interface ProjectInfo { title: string; subtitle: string; problemStatement: string; currency: 'MYR'|'USD'|'SGD' }
export interface Package     { id: string; name: string; price: number; duration: string; recommended: boolean; color: PackageColor; features: string[] }
export interface AudienceBenefit { audience: string; description: string }
export interface BrandConfig { primaryColor?: string; accentColor?: string; logoUrl?: string }

export interface Quote {
  id: string
  shareId: string
  status: QuoteStatus
  language: Language
  client: ClientInfo
  project: ProjectInfo
  packages: Package[]          // 1..3
  benefits: AudienceBenefit[]  // 0..4
  techStack: string[]
  branding: BrandConfig
  validUntil: string           // ISO date
  createdAt: string
  updatedAt: string
}
```

### 4. Laravel 11 API (`apps/api/`)

- `composer create-project laravel/laravel apps/api "^11.0"`
- Install: `spatie/laravel-data` only. **Do not** install `laravel/sanctum`. **Do not** install `spatie/browsershot` in Phase 1 — its value is the node/puppeteer side we've explicitly moved to the sidecar; adding it without a node binary inside the API container is dead weight.
- **Enable the API route file manually** — `php artisan install:api` pulls Sanctum, which is forbidden. Instead:
  1. Create `routes/api.php` by hand.
  2. In `bootstrap/app.php`, extend `withRouting`:
     ```php
     ->withRouting(
         web: __DIR__.'/../routes/web.php',
         api: __DIR__.'/../routes/api.php',
         apiPrefix: 'api',
         commands: __DIR__.'/../routes/console.php',
         health: '/up',
     )
     ```
- **Force JSON responses across the API.** Laravel 11 still renders HTML for validation/404/auth failures unless told otherwise. In `bootstrap/app.php` `withExceptions`, add:
  ```php
  ->withExceptions(function (Exceptions $exceptions) {
      $exceptions->shouldRenderJsonWhen(fn ($request) => $request->is('api/*'));
  })
  ```
- `AdminTokenMiddleware`: read `ADMIN_API_TOKEN` from env; reject requests whose `Authorization: Bearer …` header doesn't match (return JSON `{ error: 'unauthorized' }` with 401). Register alias `'admin' => AdminTokenMiddleware::class` in `bootstrap/app.php` via `withMiddleware(fn ($m) => $m->alias([...]))`.
- Quote model uses `HasUuids` trait — UUID primary key. Add a `creating` hook (or `booted()` method) that fills `share_id` with `Str::random(16)` if blank — the column is unique-indexed but has no DB default.
- `quotes` migration:
  ```php
  Schema::create('quotes', function (Blueprint $t) {
      $t->uuid('id')->primary();
      $t->string('share_id', 32)->unique()->index();
      $t->enum('status', ['draft','sent','accepted','expired'])->default('draft');
      $t->string('language', 2)->default('en');
      $t->json('client');
      $t->json('project');
      $t->json('packages');
      $t->json('benefits');
      $t->json('tech_stack');
      $t->json('branding');
      $t->date('valid_until');
      $t->timestamps();
  });
  ```
  (No `user_id` — single-user MVP.)
- Routes (`routes/api.php`):
  ```
  GET    /api/health                       (public)

  GET    /api/quotes                       (admin)
  POST   /api/quotes                       (admin)
  GET    /api/quotes/{id}                  (admin)
  PUT    /api/quotes/{id}                  (admin)
  DELETE /api/quotes/{id}                  (admin)
  GET    /api/quotes/{id}/pdf              (admin)

  GET    /api/public/q/{shareId}           (public, sanitized payload)
  ```

### 5. Puppeteer sidecar (`apps/puppeteer/`)

- `src/server.ts`: Express app, single route `POST /render` accepting `{ url: string, format?: 'A4' }`, returning `application/pdf`. Reuses one browser instance across requests (`puppeteer.launch()` at boot). Launch with Docker-safe flags:
  ```ts
  puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })
  ```
- Health route `GET /health` returning `{ ok: true }`.
- Dockerfile based on `node:22-slim` with the deps needed by bundled Chromium (`fonts-liberation`, `libnss3`, `libatk1.0-0`, `libatk-bridge2.0-0`, `libcups2`, `libxcomposite1`, `libxdamage1`, `libxrandr2`, `libgbm1`, `libpango-1.0-0`, `libcairo2`, `libasound2`) — or use `ghcr.io/puppeteer/puppeteer:latest` as the base. Keep image lean; don't install full Chrome.

### 6. `QuotePdfService` (Laravel)

- Receives a `Quote` model.
- Builds the print URL: `{FRONTEND_INTERNAL_URL}/q/{shareId}?print=1`.
- POSTs `{ url }` to `http://puppeteer:3000/render` using Laravel's HTTP client.
- Returns PDF bytes.
- Browsershot is **not installed** in Phase 1 (see §4) — the sidecar is the only PDF path. Revisit only if the sidecar approach fails on the VPS.
- `?print=1` is a layout/CSS hint, not a security boundary — the `/q/:shareId` route is already public.

### 7. Docker Compose (dev, `docker-compose.yml`)

- Services: `web`, `api`, `puppeteer`. **No** mysql, **no** redis.
- All three join external network `axelnova-shared` (declared `external: true`). Sanity-check the network name matches `axelnova-infra/docker-compose.yml` (`networks.axelnova-shared.name`).
- `api` env: `APP_KEY` (generated), `ADMIN_API_TOKEN`, `DB_HOST=mysql DB_PORT=3306 DB_DATABASE=axelnova_tools_db DB_USERNAME=axelnova_tools_user DB_PASSWORD=axelnova_tools_local_pw CACHE_STORE=database QUEUE_CONNECTION=sync SESSION_DRIVER=file PUPPETEER_URL=http://puppeteer:3000 FRONTEND_INTERNAL_URL=http://web:3000`.
- `web` env: `NUXT_PUBLIC_API_BASE=http://localhost:8004` (browser-side), `NUXT_API_BASE_INTERNAL=http://api:8000` (SSR-side).
- Host port bindings: `127.0.0.1:3004:3000` (web), `127.0.0.1:8004:8000` (api). Puppeteer has no host port.
- Container names: `axelnova-tools-web-dev`, `axelnova-tools-api-dev`, `axelnova-tools-puppeteer-dev`.
- All services get `restart: unless-stopped`. Puppeteer also gets a `healthcheck` hitting `GET /health` — Chromium can crash and silent zombies are the worst kind.
- Dev bind mounts: `./apps/web:/app` with a **named volume for `/app/node_modules`** (host installs don't reach the container — must `docker compose exec web npm install` or rebuild); `./apps/api:/var/www/html` with named volume for `/var/www/html/vendor`. Same pattern for puppeteer.

### 8. Updates to `/Users/BHQIMBP14/Developer/axelnova-infra/`

These changes belong in the infra repo, not this one — make them as part of the same scaffolding pass and call them out as a separate commit so the user can PR them into `axelnova-infra` cleanly.

1. **`scripts/init-databases.sql`** — append:
   ```sql
   -- axelnova-tools
   CREATE DATABASE IF NOT EXISTS axelnova_tools_db
     CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   CREATE USER IF NOT EXISTS 'axelnova_tools_user'@'%' IDENTIFIED BY 'axelnova_tools_local_pw';
   GRANT ALL PRIVILEGES ON axelnova_tools_db.* TO 'axelnova_tools_user'@'%';
   ```
   (Only runs on fresh MySQL volume. For the already-running instance, run `scripts/new-project-db.sh` — do **not** ask the user to nuke the volume.)
2. **`docs/port-allocation.md`** — add rows for web 3004 and api 8004 under "Project apps".
3. **`docs/project-registry.md`** — add an `axelnova-tools` entry.
4. **`database/axelnova-tools/schema.md`** — new file documenting the `quotes` table.

### 8b. `.env.example` (repo root)

Enumerate every var consumed by `docker-compose.yml`:
```
# API (Laravel)
APP_KEY=                                  # generate with `php artisan key:generate --show`
ADMIN_API_TOKEN=                          # any opaque string, ≥ 32 chars
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=axelnova_tools_db
DB_USERNAME=axelnova_tools_user
DB_PASSWORD=axelnova_tools_local_pw
CACHE_STORE=database
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
PUPPETEER_URL=http://puppeteer:3000
FRONTEND_INTERNAL_URL=http://web:3000

# Web (Nuxt)
NUXT_PUBLIC_API_BASE=http://localhost:8004
NUXT_API_BASE_INTERNAL=http://api:8000
```

### 9. README

- One-paragraph project purpose.
- Quick start:
  ```
  # 1. Make sure shared infra is up (mysql only — redis not needed in Phase 1)
  cd ../axelnova-infra && docker compose up -d

  # 2. Create the DB (first time only) — creates axelnova_tools_db + axelnova_tools_user
  bash scripts/new-project-db.sh axelnova_tools

  # 3. Copy env and generate APP_KEY
  cd ../axelnova-tools && cp .env.example .env
  docker compose run --rm api php artisan key:generate --show   # paste into .env as APP_KEY
  # set ADMIN_API_TOKEN to any opaque string in .env

  # 4. Boot tools
  docker compose up -d

  # 5. Migrate
  docker compose exec api php artisan migrate
  ```
- URLs: `http://localhost:3004` (web), `http://localhost:8004/api/health` (api).
- How to add a new tool to the hub (one paragraph: add a `ToolCard` entry + a `pages/<tool>/` directory).
- Deployment pointer: "see `hostinger-vps-setup.md` § 15 for the deploy pattern this mirrors."

---

## Phase 2 — Quote Builder features (separate prompt later)

Don't build these now. Leave clean stub files where indicated.

- Builder form with live preview split-pane
- Package editor with drag-to-reorder
- i18n toggle (en/ms) with full translations
- Save draft → publish flow
- Share link copy + public view
- PDF download button → `GET /api/quotes/{id}/pdf`
- Print stylesheet (A4, no nav, no shadows, `print-color-adjust: exact`)
- `?prefill=<base64-json>` decode on `quote/new` to support dashboard deep-link

---

## Phase 3 — Production deploy (later)

- `docker-compose.prod.yml` with prod port bindings (TBD, but reserve **3014**/web and **8014**/api or similar — confirm with `axelnova-infra/docs/port-allocation.md` at deploy time).
- `.github/workflows/deploy.yml` mirroring the pattern in `hostinger-vps-setup.md` § 15.
- Nginx config for `tools.axelnova.tech` with `/api/*` → Laravel, everything else → Nuxt.
- Certbot command for the subdomain.

---

## Constraints

1. **No bullshit comments.** Code should explain itself. Only comment intent, never mechanics.
2. **No `any` in TypeScript.** Use `unknown` + narrowing.
3. **No scoped styles for layout.** Tailwind utilities everywhere. Scoped styles allowed only for animations.
4. **Component files ≤ 200 lines.** Split if larger.
5. **API responses are JSON.** No Inertia, no Blade.
6. **PSR-12 for PHP. ESLint + Prettier defaults for TS.**
7. **OKLCH for colors** (except tech-stack pill backgrounds where transparency hex makes sense).
8. **Mobile-first.** Builder stacks; preview reachable via bottom sheet.
9. **No external CDNs at runtime.** Bundle fonts.

---

## Deliverable for Phase 1

When you finish:
1. The full file tree under `axelnova-tools/` (so it can be verified against the spec above).
2. A separate diff/PR description for the `axelnova-infra/` changes (see § 8).
3. `docker compose up -d` log, and `docker compose exec api php artisan migrate` output.
4. Live checks:
   - `curl http://localhost:8004/api/health` → 200
   - `curl http://localhost:3004` → 200
   - `curl http://axelnova-tools-puppeteer-dev:3000/health` (from inside the api container) → 200
5. A checklist of what's stubbed vs implemented.

Then stop and wait for verification before Phase 2.
