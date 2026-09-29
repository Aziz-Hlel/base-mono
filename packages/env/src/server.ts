import { devEnvs, prodEnvs } from './server/NodeEnvs';
import devSchema from './server/schema.dev';
import prodSchema from './server/schema.prod';
import 'dotenv/config';
import z from 'zod';

const envSchema = z.discriminatedUnion('NODE_ENV', [prodSchema, devSchema]);

const validatedEnv = envSchema.safeParse(process.env);
if (!validatedEnv.success) {
  const formattedZodError = z.treeifyError(validatedEnv.error);
  throw new Error('❌ ERROR : Zod validation failed', { cause: formattedZodError });
}
console.log('✅ SUCCESS : ENV is valid');

const serverENV = validatedEnv.data;

export default serverENV;

export const isProd = () => {
  return prodEnvs.some((env) => env === serverENV.NODE_ENV);
};

export const isDev = () => {
  return devEnvs.some((env) => env === serverENV.NODE_ENV);
};

export const hasEnvProdFields = (
  env: typeof serverENV,
): env is Extract<typeof serverENV, { NODE_ENV: 'production' | 'stage' }> =>
  env.NODE_ENV === 'production' || env.NODE_ENV === 'stage';
