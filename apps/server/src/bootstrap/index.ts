import prismaConnect from './connections/prisma.connect';
import redisConnect from './connections/redis.connect';

const initializeServices = async () => {
  await redisConnect();
  await prismaConnect();
};
export default initializeServices;
