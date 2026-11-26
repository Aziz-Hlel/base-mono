import { z } from 'zod';
import { userResSchema } from '../user/user.res';

export const meResSchema = z
  .object({
    user: userResSchema,
  })
  .meta({
    id: 'MeRes',
    description: 'Current authenticated user',
  });

export type MeRes = z.infer<typeof meResSchema>;
