import { z } from 'zod';
import { guardianBaseSchema } from '../../base/guardian.base-schema';
import { profileMinimalResSchema } from '../profile/profile-minimal.res';
import { userMinimalResSchema } from '../user/user-minimal.res';

export const guardianMinimalResSchema = z
  .object({
    id: guardianBaseSchema.id,
    user: userMinimalResSchema,
    profile: profileMinimalResSchema,
  })
  .meta({
    id: 'GuardianMinimalRes',
  });

export type GuardianMinimalRes = z.infer<typeof guardianMinimalResSchema>;
