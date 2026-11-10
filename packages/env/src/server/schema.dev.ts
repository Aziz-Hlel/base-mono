import z from 'zod';
import { devEnvs } from './NodeEnvs';
import { awsBedrockSchema, minioSchema } from './envs.fields';
import baseSchema from './schema.base';

const devSchema = baseSchema.extend({
  NODE_ENV: z.enum(devEnvs),

  // STORAGE
  ...minioSchema,

  ...awsBedrockSchema,

  // CORS
  // // ? kept it here just so i don't forget what i did
  // ...corsSchema,
});

export default devSchema;
