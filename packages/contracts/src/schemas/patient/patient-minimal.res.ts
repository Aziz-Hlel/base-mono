import { z } from 'zod';
import { patientBaseSchema } from '../../base/patient.base-schema';
import { profileMinimalResSchema } from '../profile/profile-minimal.res';
import { userMinimalResSchema } from '../user/user-minimal.res';

export const patientMinimalResSchema = z
  .object({
    id: patientBaseSchema.id,
    journeyStage: patientBaseSchema.journeyStage,
    user: userMinimalResSchema,
    profile: profileMinimalResSchema,
  })
  .meta({
    id: 'PatientMinimalRes',
  });

export type PatientMinimalRes = z.infer<typeof patientMinimalResSchema>;
