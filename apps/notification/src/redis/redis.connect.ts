import redis from '.';

const redisConnect = async () => {
  try {
    await redis.connect();
    console.log(`✅ SUCCESS : Redis initialized successfully`);
  } catch (error) {
    console.error('❌ Redis connection error:', error);
    process.exit(1);
  }
};

export default redisConnect;
