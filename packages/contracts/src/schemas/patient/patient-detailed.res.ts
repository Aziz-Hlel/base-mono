import type { z } from 'zod';
import { profileResSchema } from '../profile/profile.res';
import { userResSchema } from '../user/user.res';
import { patientResSchema } from './patient.res';

export const patientDetailedResSchema = patientResSchema
  .extend({
    user: userResSchema,
    profile: profileResSchema,
  })
  .meta({
    id: 'PatientDetailedRes',
    description: 'Patient with its user and profile',
  });

export type PatientDetailedRes = z.infer<typeof patientDetailedResSchema>;
