import { z } from 'zod';

const ENV_schema = z
  .object({
    VITE_NODE_ENV: z.enum(['dev', 'stage', 'production']),
    VITE_LANDING_PORT: z.coerce.number().int().positive().optional(),
    VITE_API_URL: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.VITE_NODE_ENV === 'dev' && data.VITE_LANDING_PORT === undefined) return false;
      return true;
    },
    {
      path: ['VITE_LANDING_PORT'],
      message: 'VITE_LANDING_PORT is required when NODE_ENV is dev',
    },
  );

const rawEnv = ENV_schema.parse(import.meta.env);

const BASE_URL = rawEnv.VITE_API_URL || 'http://localhost:1100';

const ENV = {
  ...rawEnv,
  BASE_URL,
};

export default ENV;
