import type { z } from 'zod';
import { profileResSchema } from '../profile/profile.res';
import { userResSchema } from '../user/user.res';
import { doctorResSchema } from './doctor.res';

export const doctorDetailedResSchema = doctorResSchema
  .extend({
    user: userResSchema,
    profile: profileResSchema,
  })
  .meta({
    id: 'DoctorDetailedRes',
    description: 'Doctor with its user and profile',
  });

export type DoctorDetailedRes = z.infer<typeof doctorDetailedResSchema>;
