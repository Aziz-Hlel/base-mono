import { API_PORT, dbSchema, FIREBASE_CERT, jwtSchema, mobileVersionsSchema, redisSchema } from './envs.fields';
import z from 'zod';

const baseSchema = z.object({
  // APP
  API_PORT,

  // FIREBASE
  FIREBASE_CERT,

  // JWT
  ...jwtSchema,

  // DB
  ...dbSchema,

  // REDIS
  ...redisSchema,

  // SMTP
  // ...smtpSchema,

  // APP VERSIONS
  ...mobileVersionsSchema,
});

export default baseSchema;
