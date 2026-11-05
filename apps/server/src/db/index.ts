import logger from '@/logger';
import prismaInstance from '@base-monorepo-v2/db';

prismaInstance.$on('query', (e) => {
  const durationInMs = e.duration;

  if (durationInMs < 1000) {
    // const durationFixed = durationInMs.toFixed(2);
    // const durationMsg = `${durationFixed} ms`;
    // return logger.debug({ duration: durationMsg }, 'Prisma query');
    return;
  }
  if (durationInMs >= 1000 && durationInMs < 3000) {
    const durationFixed = (durationInMs / 1000).toFixed(2);
    const durationMsg = `${durationFixed} s`;
    return logger.warn({ query: e.query, duration: durationMsg }, 'Prisma query slow');
  }

  const durationFixed = (durationInMs / 1000).toFixed(2);
  const durationMsg = `${durationFixed} s`;
  return logger.error({ query: e.query, duration: durationMsg }, 'Prisma query very slow');
});

prismaInstance.$on('error', (e) => {
  logger.error({ target: e.target, message: e.message }, 'Prisma error');
});

prismaInstance.$on('warn', (e) => {
  logger.warn({ target: e.target, message: e.message }, 'Prisma warning');
});

const prisma = prismaInstance;

export default prisma;
