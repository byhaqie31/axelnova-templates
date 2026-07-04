# apps/api setup

This directory ships a **bootstrap** mechanism, not a full Laravel scaffold. Run `bootstrap.sh` once after cloning the template — it installs Laravel 11, applies our overrides, and removes itself.

## Prerequisites

- `composer` on your host (`brew install composer` on macOS). The script does not require local PHP — it uses the composer Docker image — but local composer makes it faster and the result is identical.
- Docker running (for the rest of the stack).

## Run it

```bash
cd apps/api
bash bootstrap.sh
```

What it does:

1. Creates a fresh Laravel 11 project in this directory
2. Overlays files from `overrides/` (custom `bootstrap/app.php`, `routes/api.php`, token middleware)
3. Installs `spatie/laravel-data`
4. Generates an `APP_KEY` and prints it
5. Removes `bootstrap.sh`, `SETUP.md`, and `overrides/` from this directory

After it finishes, paste the printed `APP_KEY` into the repo-root `.env`, set `ADMIN_API_TOKEN`, then `docker compose up -d` from the repo root.

## What the overrides do

- **`bootstrap/app.php`** — enables `routes/api.php` with `/api` prefix, registers the `admin` middleware alias, forces JSON responses for `api/*` failures.
- **`routes/api.php`** — `/api/health` (public) + an `admin`-protected group with a single example route.
- **`app/Http/Middleware/AdminTokenMiddleware.php`** — bearer-token check against `ADMIN_API_TOKEN`. Reject = 401 JSON.

No Sanctum. No Redis. No Browsershot (PDFs come from the puppeteer sidecar).
