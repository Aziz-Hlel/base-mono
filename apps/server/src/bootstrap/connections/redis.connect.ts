import redis from '@/redis/init';
import logServiceConnect from '../utils/logServiceConnect';

const redisConnect = async () => {
  try {
    await redis.connect();
    logServiceConnect('Redis');
  } catch (error) {
    console.error('❌ Redis connection error:', error);
    process.exit(1);
  }
};

export default redisConnect;
