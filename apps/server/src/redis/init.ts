import getRedisClient from '@base-monorepo-v2/redis';

const redis = getRedisClient();

redis.on('ready', () => {
  console.log('✅✅✅✅✅✅✅✅');
});

redis.on('error', (err) => {
  console.error('❌ ERROR : Redis error', err);
});

redis.on('warning', (warning) => {
  console.warn('⚠️ WARNING : Redis warning', warning);
});

export default redis;
