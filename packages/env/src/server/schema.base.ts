import { API_PORT, dbSchema, FIREBASE_CERT, mobileVersionsSchema, redisSchema } from './envs.fields';
import z from 'zod';

const baseSchema = z.object({
  // APP
  API_PORT,

  // FIREBASE
  FIREBASE_CERT,

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
