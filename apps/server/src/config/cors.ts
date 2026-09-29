import ENV from '@/env';
import { hasEnvProdFields } from '@base-monorepo-v2/env/server';
import cors from 'cors';

export function configureCors() {
  return cors({
    origin: hasEnvProdFields(ENV) ? ENV.ALLOWED_ORIGIN_PATTERNS : '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Content-Length'],
    credentials: true,
    maxAge: 86400, // cache preflight for 24h
  });
}
