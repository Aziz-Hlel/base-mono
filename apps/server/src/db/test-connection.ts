import prisma from '.';

export const testDbConnection = async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ SUCCESS : Database connected successfully!');
  } catch (error) {
    throw new Error('❌ ERROR : Database connection failed.', { cause: error });
  }
};
