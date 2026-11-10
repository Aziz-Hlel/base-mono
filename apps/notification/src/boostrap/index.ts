import prisma from '@/db';
import '@/env';
import '@/logger';
import redis from '@/redis';

const boostrap = async () => {
  try {
    await redis.connect();
    console.log(`✅ SUCCESS : Redis initialized successfully`);
  } catch (error) {
    console.error('❌ Redis connection error:', error);
    throw error;
  }

  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ SUCCESS : Database connected successfully!');
  } catch (error) {
    console.error('❌ ERROR : Database connection failed.', error);
    throw error;
  }
};

export default boostrap;
