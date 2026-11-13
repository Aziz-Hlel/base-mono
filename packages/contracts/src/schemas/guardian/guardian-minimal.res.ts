import { z } from 'zod';
import { guardianBaseSchema } from '../../base/guardian.base-schema';
import { patientMinimalResSchema } from '../patient/patient-minimal.res';
import { profileMinimalResSchema } from '../profile/profile-minimal.res';
import { userMinimalResSchema } from '../user/user-minimal.res';

export const guardianMinimalResSchema = z
  .object({
    id: guardianBaseSchema.id,
    user: userMinimalResSchema,
    profile: profileMinimalResSchema,
    patients: z.array(patientMinimalResSchema),
    createdAt: guardianBaseSchema.createdAt,
    updatedAt: guardianBaseSchema.updatedAt,
  })
  .meta({
    id: 'GuardianMinimalRes',
  });

export type GuardianMinimalRes = z.infer<typeof guardianMinimalResSchema>;
