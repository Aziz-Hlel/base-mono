import redis from './init';
import { CacheMetrics } from './metrics.service';

type getParams = { key: string };
type setParams<T> = { value: T; ttlSeconds: number } & getParams;

export class RedisService {
  cacheMetrics = new CacheMetrics();

  async get<T>(props: getParams): Promise<T | null> {
    const key = props.key;
    // const hashedKey = this.stableHash(value);
    try {
      const value = await redis.get(key);
      if (value) {
        this.cacheMetrics.recordHit();
        return JSON.parse(value);
      }
      this.cacheMetrics.recordMiss();
      return null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }
  async set<T>(props: setParams<T>): Promise<void> {
    const key = props.key;
    // const hashedKey = this.stableHash(key);
    try {
      await redis.set(key, JSON.stringify(props.value), 'EX', props.ttlSeconds);
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async del(key: string): Promise<void> {
    // const hashedKey = this.stableHash(key);
    try {
      const keys = await redis.keys(key);
      if (keys.length) {
        await redis.del(keys);
      }
    } catch (error) {
      console.error('Cache delete error:', error);
    }
  }
}

export const cacheService = new RedisService();
