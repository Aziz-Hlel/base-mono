import { initCacheEnv } from '@base-monorepo-v2/env/cache';
import Redis from 'ioredis';

const cacheEnv = initCacheEnv();

let redis: Redis;

const getRedisClient = async () => {
  if (redis) return redis;

  redis = new Redis({
    host: cacheEnv.REDIS_HOST,
    port: cacheEnv.REDIS_PORT,
    password: cacheEnv.REDIS_PASSWORD,
    lazyConnect: true,
    maxRetriesPerRequest: null, // ! made it null just to satisfy the notification queue
    enableReadyCheck: true,
  });
  try {
    await redis.connect();
    console.log('✅ SUCCESS : Redis connected successfully.');
  } catch (err) {
    throw new Error('❌ ERROR : Redis connection failed', { cause: err });
  }

  redis.on('error', (err) => {
    console.error('❌ ERROR : Redis error', err);
  });

  redis.on('warning', (warning) => {
    console.warn('⚠️ WARNING : Redis warning', warning);
  });

  return redis;
};

export default getRedisClient;
