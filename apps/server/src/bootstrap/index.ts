import { firebaseProvider } from '@/firebase';
import isPrismaConnected from './connections/prisma.connect';
import isRedisConnected from './connections/redis.connect';

const initializeServices = async () => {
  await isPrismaConnected();
  await isRedisConnected();
  await firebaseProvider.checkConnection();
};
export default initializeServices;
