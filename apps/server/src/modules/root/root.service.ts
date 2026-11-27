import redis from '@/redis/init';
import { execSync } from 'node:child_process';

class RootService {
  hardReset = async () => {
    await redis.flushdb();

    execSync('bun --filter @excellense/db db:push --force-reset', {
      stdio: 'inherit',
    });
  };
}

export const rootService = new RootService();
