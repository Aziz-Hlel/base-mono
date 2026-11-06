import 'dotenv/config';
import z from 'zod';
import { dbSchema, FIREBASE_CERT, NODE_ENV, redisSchema } from './server/envs.fields';

const notificationEnvSchema = z.object({
  NODE_ENV,
  ...redisSchema,
  ...dbSchema,
  FIREBASE_CERT,
});

const validatedEnv = notificationEnvSchema.safeParse(process.env);
if (!validatedEnv.success) {
  const formattedZodError = z.treeifyError(validatedEnv.error);
  throw new Error('❌ ERROR : Zod validation failed', { cause: formattedZodError });
}
console.log('✅ SUCCESS : ENV is valid');

export const notificationEnv = validatedEnv.data;
