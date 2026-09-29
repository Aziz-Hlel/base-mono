import { redisSchema } from './server/envs.fields';
import 'dotenv/config';
import z from 'zod';

export const cacheEnvSchema = z.object(redisSchema);
const validatedEnv = cacheEnvSchema.safeParse(process.env);

export const initCacheEnv = () => {
  if (!validatedEnv.success) {
    const formattedZodError = z.treeifyError(validatedEnv.error);
    throw new Error('❌ ERROR : Zod validation failed', { cause: formattedZodError });
  }

  return validatedEnv.data;
};
