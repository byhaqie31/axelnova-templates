# syntax=docker/dockerfile:1.7

FROM composer:2 AS composer-bin

FROM php:8.4-cli-alpine AS base
RUN apk add --no-cache \
      git \
      unzip \
      libzip-dev \
      oniguruma-dev \
      libpng-dev \
      icu-dev \
    && docker-php-ext-install pdo_mysql zip bcmath intl
COPY --from=composer-bin /usr/bin/composer /usr/bin/composer
WORKDIR /var/www/html

# ---- dev: source mounted at runtime, composer install runs in compose ----
FROM base AS dev
EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]

# ---- build: optimized prod artifact -------------------------------------
FROM base AS build
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist --no-interaction
COPY . .
RUN composer dump-autoload --optimize --no-dev \
    && mkdir -p bootstrap/cache \
                storage/app \
                storage/framework/cache \
                storage/framework/sessions \
                storage/framework/views \
                storage/logs \
    && chown -R www-data:www-data storage bootstrap/cache

# ---- runtime: thin -------------------------------------------------------
FROM base AS runtime
COPY --from=build /var/www/html /var/www/html
RUN chown -R www-data:www-data storage bootstrap/cache
USER www-data
EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]
