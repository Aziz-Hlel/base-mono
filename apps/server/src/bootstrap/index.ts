import isPrismaConnected from './connections/prisma.connect';
import isRedisConnected from './connections/redis.connect';

const initializeServices = async () => {
  await isPrismaConnected();
  await isRedisConnected();
};
export default initializeServices;
