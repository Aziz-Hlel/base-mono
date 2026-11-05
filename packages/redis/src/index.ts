import { initCacheEnv } from '@base-monorepo-v2/env/cache';
import Redis from 'ioredis';

const cacheEnv = initCacheEnv();

const getRedisClient = () => {
  const client = new Redis({
    host: cacheEnv.REDIS_HOST,
    port: cacheEnv.REDIS_PORT,
    password: cacheEnv.REDIS_PASSWORD,
    lazyConnect: true,
    enableReadyCheck: true,
  });

  // Listeners registered ONCE, here.
  client.on('error', (err) => console.error('❌ ERROR : Redis error', err));
  client.on('warning', (w) => console.warn('⚠️ WARNING : Redis warning', w));

  return client;
};

export default getRedisClient;
