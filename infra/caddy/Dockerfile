FROM oven/bun:1-slim AS builder
WORKDIR /app

# Install workspace dependencies first for layer caching
COPY package.json bun.lock ./
COPY apps/admin/package.json apps/admin/package.json
COPY apps/landing/package.json apps/landing/package.json
COPY apps/server/package.json apps/server/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/config/package.json packages/config/package.json
COPY packages/contracts/package.json packages/contracts/package.json
COPY packages/db/package.json packages/db/package.json
COPY packages/env/package.json packages/env/package.json
COPY packages/redis/package.json packages/redis/package.json
COPY packages/ui/package.json packages/ui/package.json
RUN bun install --frozen-lockfile

COPY apps/admin apps/admin
COPY apps/landing apps/landing
COPY packages packages

ARG VITE_NODE_ENV
ARG VITE_API_URL
ENV VITE_NODE_ENV=${VITE_NODE_ENV}
ENV VITE_API_URL=${VITE_API_URL}

RUN bun --cwd apps/admin run build
RUN bun --cwd apps/landing run build

FROM caddy:2-alpine AS runner

COPY --from=builder /app/apps/admin/dist /srv/admin
COPY --from=builder /app/apps/landing/dist /srv/landing
COPY infra/caddy/Caddyfile /etc/caddy/Caddyfile

EXPOSE 80 443
