import { DB_ENV } from '@base-monorepo-v2/env/db';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../prisma/generated/client';

const connectionString = `postgresql://${DB_ENV.DB_USER}:${DB_ENV.DB_PASSWORD}@${DB_ENV.DB_HOST}:${DB_ENV.DB_PORT}/${DB_ENV.DB_NAME}`;

export function createPrismaClient() {
  const adapter = new PrismaPg({
    connectionString,
  });
  return new PrismaClient({
    adapter,
    log: [
      { emit: 'event', level: 'query' },
      { emit: 'event', level: 'error' },
      { emit: 'event', level: 'warn' },
    ],
  });
}

const prismaInstance = createPrismaClient();

export default prismaInstance;
