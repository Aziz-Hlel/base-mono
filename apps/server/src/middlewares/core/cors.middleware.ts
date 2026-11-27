import ENV from '@/env';
import { hasEnvProdFields } from '@excellense/env/server';
import cors from 'cors';

export function corsMiddleware() {
  return cors({
    origin: hasEnvProdFields(ENV) ? ENV.ALLOWED_ORIGIN_PATTERNS : true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    exposedHeaders: ['Content-Length'],
    credentials: true,
    maxAge: 86400, // cache preflight for 24h
  });
}
