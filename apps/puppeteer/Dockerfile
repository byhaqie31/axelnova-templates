# syntax=docker/dockerfile:1.7

FROM node:22-slim AS base
WORKDIR /app
ENV PUPPETEER_CACHE_DIR=/app/.cache/puppeteer

# Chromium runtime deps. We're using puppeteer's bundled Chromium (not system).
RUN apt-get update && apt-get install -y --no-install-recommends \
      ca-certificates \
      fonts-liberation \
      libnss3 \
      libatk1.0-0 \
      libatk-bridge2.0-0 \
      libcups2 \
      libxcomposite1 \
      libxdamage1 \
      libxrandr2 \
      libgbm1 \
      libpango-1.0-0 \
      libcairo2 \
      libasound2 \
      libxshmfence1 \
      wget \
    && rm -rf /var/lib/apt/lists/*

# ---- dev: source + node_modules mounted via compose ---------------------
FROM base AS dev
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ---- build --------------------------------------------------------------
FROM base AS build
COPY package.json ./
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build

# ---- runtime ------------------------------------------------------------
FROM base AS runtime
ENV NODE_ENV=production
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.cache ./.cache
COPY --from=build /app/dist ./dist
COPY --from=build /app/package.json ./
EXPOSE 3000
CMD ["node", "dist/server.js"]
