import z from 'zod';
import {
  API_PORT,
  APP_NAME,
  dbSchema,
  FIREBASE_CERT,
  jwtSchema,
  mobileVersionsSchema,
  redisSchema,
} from './envs.fields';

const baseSchema = z.object({
  // APP
  API_PORT,
  APP_NAME,

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
