import z from 'zod';
import { prodEnvs } from './NodeEnvs';
import { corsSchema } from './envs.fields';
import baseSchema from './schema.base';

const prodSchema = baseSchema.extend({
  NODE_ENV: z.enum(prodEnvs),

  // CORS
  ...corsSchema,
});

export default prodSchema;
export type ProdEnv = z.infer<typeof prodSchema>;
