FROM oven/bun:1-slim AS builder
WORKDIR /app

COPY package.json bun.lock ./
COPY apps/admin/package.json apps/admin/package.json
COPY apps/landing/package.json apps/landing/package.json
COPY apps/server/package.json apps/server/package.json
COPY packages/config/package.json packages/config/package.json
COPY packages/contracts/package.json packages/contracts/package.json
COPY packages/db/package.json packages/db/package.json
COPY packages/env/package.json packages/env/package.json
COPY packages/redis/package.json packages/redis/package.json
COPY packages/ui/package.json packages/ui/package.json
RUN bun install --frozen-lockfile

COPY apps/server apps/server
COPY packages packages

ENV NODE_ENV=production
RUN bun --cwd packages/db run db:generate
RUN bun --filter server build

FROM oven/bun:1-slim AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/package.json /app/bun.lock ./
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/packages/db/prisma.config.ts /app/apps/server/prisma.config.ts
COPY --from=builder /app/packages/db/prisma /app/apps/server/prisma
COPY --from=builder /app/apps/server/package.json /app/apps/server/package.json
COPY --from=builder /app/apps/server/node_modules /app/apps/server/node_modules
COPY --from=builder /app/apps/server/dist /app/apps/server/dist

WORKDIR /app/apps/server
EXPOSE 3000

CMD ["bun", "dist/index.mjs"]
