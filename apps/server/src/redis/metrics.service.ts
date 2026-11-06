import logger from '@/logger';

export class CacheMetrics {
  static hits = 0;
  static misses = 0;

  recordHit() {
    CacheMetrics.hits += 1;
    if ((CacheMetrics.hits + CacheMetrics.misses) % 10 === 0) {
      logger.debug(CacheMetrics.getMetrics(), 'Cache Metrics:');
    }
  }

  recordMiss() {
    CacheMetrics.misses += 1;
    if ((CacheMetrics.hits + CacheMetrics.misses) % 10 === 0) {
      logger.debug(CacheMetrics.getMetrics(), 'Cache Metrics:');
    }
  }

  static getMetrics() {
    const total = this.hits + this.misses;
    const hitRate = total === 0 ? 0 : ((this.hits / total) * 100).toFixed(2);
    const missRate = total === 0 ? 0 : ((this.misses / total) * 100).toFixed(2);
    return {
      total: total,
      hits: this.hits,
      misses: this.misses,
      hitRate: `${hitRate}%`,
      missRate: `${missRate}%`,
    };
  }
}

export default CacheMetrics;
