import z from 'zod';
import { devEnvs } from './NodeEnvs';
import baseSchema from './schema.base';

const devSchema = baseSchema.extend({
  NODE_ENV: z.enum(devEnvs),

  // CORS
  // // ? kept it here just so i don't forget what i did
  // ...corsSchema,
});

export default devSchema;
