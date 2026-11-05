import { initCacheEnv } from '@base-monorepo-v2/env/cache';
import Redis, { type RedisOptions } from 'ioredis';

const cacheEnv = initCacheEnv();

const createRedisClient = (options: Partial<RedisOptions> = {}) => {
  const client = new Redis({
    host: cacheEnv.REDIS_HOST,
    port: cacheEnv.REDIS_PORT,
    password: cacheEnv.REDIS_PASSWORD,
    lazyConnect: true,
    enableReadyCheck: true,
    ...options,
  });

  // Listeners registered ONCE, here.
  client.on('error', (err) => console.error('❌ ERROR : Redis error', err));
  client.on('warning', (w) => console.warn('⚠️ WARNING : Redis warning', w));

  return client;
};

export default createRedisClient;
