import { storageProvider } from '@/storage';
import isPrismaConnected from './connections/prisma.connect';
import isRedisConnected from './connections/redis.connect';

const initializeServices = async () => {
  await isPrismaConnected();
  await isRedisConnected();
  await storageProvider.checkConnection();
};
export default initializeServices;
