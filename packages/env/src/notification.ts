import { oneSignalSchema, redisSchema } from './server/envs.fields';
import 'dotenv/config';
import z from 'zod';

const notificationEnvSchema = z.object({
  ...redisSchema,
  ...oneSignalSchema,
});

const validatedEnv = notificationEnvSchema.safeParse(process.env);
if (!validatedEnv.success) {
  const formattedZodError = z.treeifyError(validatedEnv.error);
  throw new Error('❌ ERROR : Zod validation failed', { cause: formattedZodError });
}

export const notificationEnv = validatedEnv.data;
