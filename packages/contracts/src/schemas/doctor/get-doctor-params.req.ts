import { z } from 'zod';
import { doctorBaseSchema } from '../../base/doctor.base-schema';

export const doctorIdParamSchema = z
  .object({
    id: doctorBaseSchema.id,
  })
  .meta({
    id: 'DoctorIdParam',
  });

export type DoctorIdParam = z.infer<typeof doctorIdParamSchema>;
