import prisma from '@/db';

const prismaConnect = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Prisma connected');
  } catch (error) {
    console.error('❌ Prisma connection error:', error);
    process.exit(1);
  }
};

export default prismaConnect;
