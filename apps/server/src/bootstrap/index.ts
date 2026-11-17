import { firebaseProvider } from '@/firebase';
import { storageService } from '@/storage';
import isPrismaConnected from './connections/prisma.connect';
import isRedisConnected from './connections/redis.connect';

const initializeServices = async () => {
  await isPrismaConnected();
  await isRedisConnected();
  await firebaseProvider.checkConnection();
  await storageService.checkConnection();
};
export default initializeServices;
