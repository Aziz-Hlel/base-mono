import redis from '@/redis/init';

const redisConnect = async () => {
  try {
    await redis.connect();
    console.log('✅ Redis connected');
  } catch (error) {
    console.error('❌ Redis connection error:', error);
    process.exit(1);
  }
};

export default redisConnect;
