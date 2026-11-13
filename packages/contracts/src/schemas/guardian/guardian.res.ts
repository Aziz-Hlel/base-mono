import { z } from 'zod';
import { guardianBaseSchema } from '../../base/guardian.base-schema';
import { patientMinimalResSchema } from '../patient/patient-minimal.res';
import { profileResSchema } from '../profile/profile.res';
import { userResSchema } from '../user/user.res';

export const guardianResSchema = z
  .object({
    id: guardianBaseSchema.id,
    user: userResSchema,
    profile: profileResSchema,
    patients: z.array(patientMinimalResSchema),
    createdAt: guardianBaseSchema.createdAt,
    updatedAt: guardianBaseSchema.updatedAt,
  })
  .meta({
    id: 'GuardianRes',
  });

export type GuardianRes = z.infer<typeof guardianResSchema>;
