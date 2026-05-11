# syntax=docker/dockerfile:1.7

FROM node:22-alpine AS base
WORKDIR /app
ENV NODE_OPTIONS=--max-old-space-size=4096

# ---- dev: hot reload, mounts source at runtime --------------------------
FROM base AS dev
COPY package.json ./
RUN npm install
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# ---- build: produce .output/ -------------------------------------------
FROM base AS build
COPY package.json ./
RUN npm install --no-audit --no-fund
COPY . .
RUN npm run build

# ---- runtime: thin, server-side rendered -------------------------------
FROM node:22-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
COPY --from=build /app/.output ./.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
