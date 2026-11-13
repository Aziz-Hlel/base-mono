import { z } from 'zod';
import { doctorBaseSchema } from '../../base/doctor.base-schema';
import { profileMinimalResSchema } from '../profile/profile-minimal.res';
import { userMinimalResSchema } from '../user/user-minimal.res';

export const doctorMinimalResSchema = z
  .object({
    id: doctorBaseSchema.id,
    titleEn: doctorBaseSchema.titleEn,
    titleAr: doctorBaseSchema.titleAr,
    specialty: doctorBaseSchema.specialty,
    user: userMinimalResSchema,
    profile: profileMinimalResSchema,
  })
  .meta({
    id: 'DoctorMinimalRes',
  });

export type DoctorMinimalRes = z.infer<typeof doctorMinimalResSchema>;
