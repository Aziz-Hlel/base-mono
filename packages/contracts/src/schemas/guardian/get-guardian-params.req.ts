import { z } from 'zod';
import { guardianBaseSchema } from '../../base/guardian.base-schema';

export const guardianIdParamSchema = z
  .object({
    id: guardianBaseSchema.id,
  })
  .meta({
    id: 'GuardianIdParam',
  });

export type GuardianIdParam = z.infer<typeof guardianIdParamSchema>;
