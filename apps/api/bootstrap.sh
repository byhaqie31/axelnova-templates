#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

if [ -f composer.json ]; then
  echo "✗ composer.json already exists here — refusing to overwrite."
  echo "  If this is a fresh clone, something went wrong. Otherwise, you've already bootstrapped."
  exit 1
fi

echo "→ Creating Laravel 11 project in $(pwd)"
TMP=$(mktemp -d)
trap 'rm -rf "$TMP"' EXIT

if command -v composer >/dev/null 2>&1; then
  composer create-project laravel/laravel "$TMP/laravel" "^11.0" \
    --prefer-dist --no-interaction --remove-vcs
else
  echo "→ No local composer found, using Docker image"
  docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$TMP:/host" \
    -w /host \
    composer:2 \
    create-project laravel/laravel laravel "^11.0" \
    --prefer-dist --no-interaction --remove-vcs
fi

echo "→ Moving Laravel files into apps/api/"
# Use cp -a to preserve dotfiles; then remove the temp source
cp -a "$TMP/laravel/." ./

echo "→ Applying overrides"
cp -R overrides/. ./
rm -rf overrides

echo "→ Installing spatie/laravel-data"
if command -v composer >/dev/null 2>&1; then
  composer require spatie/laravel-data --no-interaction
else
  docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v "$(pwd):/app" \
    -w /app \
    composer:2 \
    require spatie/laravel-data --no-interaction
fi

echo "→ Generating APP_KEY"
APP_KEY_OUTPUT=$(if command -v php >/dev/null 2>&1; then
  php artisan key:generate --show
else
  docker run --rm \
    -v "$(pwd):/app" \
    -w /app \
    php:8.4-cli-alpine \
    php artisan key:generate --show
fi)

echo "→ Cleaning up bootstrap artifacts"
rm -f bootstrap.sh SETUP.md

echo ""
echo "✓ apps/api bootstrapped."
echo ""
echo "Next steps (from repo root):"
echo "  1. Paste this APP_KEY into your .env:"
echo "       APP_KEY=$APP_KEY_OUTPUT"
echo "  2. Set ADMIN_API_TOKEN in .env (any opaque string ≥ 32 chars)"
echo "  3. docker compose up -d"
echo "  4. docker compose exec api php artisan migrate"
