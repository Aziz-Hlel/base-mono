import { z } from 'zod';
import { guardianshipBaseSchema } from '../../base/guardianship.base-schema';

export const guardianshipIdParamSchema = z
  .object({
    id: guardianshipBaseSchema.id,
  })
  .meta({
    id: 'GuardianshipIdParam',
  });

export type GuardianshipIdParam = z.infer<typeof guardianshipIdParamSchema>;
