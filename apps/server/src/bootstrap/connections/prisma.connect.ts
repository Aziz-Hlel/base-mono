import prisma from '@/db';
import logServiceConnect from '../utils/logServiceConnect';

const isPrismaConnected = async () => {
  try {
    await prisma.$connect();
    logServiceConnect('Prisma');
  } catch (error) {
    console.error('❌ Prisma connection error:', error);
    process.exit(1);
  }
};

export default isPrismaConnected;
