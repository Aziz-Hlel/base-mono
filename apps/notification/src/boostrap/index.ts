import { testDbConnection } from '@/db';
import '@/env';
import '@/logger';
import redisConnect from '@/redis/redis.connect';

const boostrap = async () => {
  await redisConnect();
  await testDbConnection();
};

export default boostrap;
