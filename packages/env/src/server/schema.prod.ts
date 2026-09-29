import { prodEnvs } from './NodeEnvs';
import { awsBedrockSchema, awsStorageSchema, cdnSchema, corsSchema } from './envs.fields';
import baseSchema from './schema.base';
import z from 'zod';

const prodSchema = baseSchema.extend({
  NODE_ENV: z.enum(prodEnvs),

  // STORAGE
  ...awsStorageSchema,

  // CDN
  ...cdnSchema,

  ...awsBedrockSchema,

  // CORS
  ...corsSchema,
});

export default prodSchema;
export type ProdEnv = z.infer<typeof prodSchema>;
