import redis from '@/redis/init';
import logServiceInit from '../utils/logServiceInit';

const redisConnect = async () => {
  try {
    await redis.connect();
    logServiceInit('Redis');
  } catch (error) {
    console.error('❌ Redis connection error:', error);
    process.exit(1);
  }
};

export default redisConnect;
