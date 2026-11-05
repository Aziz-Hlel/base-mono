import prisma from '@/db';
import logServiceInit from '../utils/logServiceInit';

const prismaConnect = async () => {
  try {
    await prisma.$connect();
    logServiceInit('Prisma');
  } catch (error) {
    console.error('❌ Prisma connection error:', error);
    process.exit(1);
  }
};

export default prismaConnect;
