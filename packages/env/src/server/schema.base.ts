import z from 'zod';
import { API_PORT, APP_NAME, dbSchema, jwtSchema, redisSchema } from './envs.fields';

const baseSchema = z.object({
  // APP
  API_PORT,
  APP_NAME,

  // JWT
  ...jwtSchema,

  // DB
  ...dbSchema,

  // REDIS
  ...redisSchema,
});

export default baseSchema;
