import { dbSchema } from './server/envs.fields';
import 'dotenv/config';
import z from 'zod';

const envSchema = z.object(dbSchema);

const validatedEnv = envSchema.safeParse(process.env);
if (!validatedEnv.success) {
  const formattedZodError = z.treeifyError(validatedEnv.error);
  throw new Error('❌ ERROR : Zod validation failed', { cause: formattedZodError });
}

export const DB_ENV = validatedEnv.data;
