import { z } from 'zod';
import { doctorBaseSchema } from '../../base/doctor.base-schema';

export const doctorResSchema = z
  .object({
    id: doctorBaseSchema.id,
    titleEn: doctorBaseSchema.titleEn,
    titleAr: doctorBaseSchema.titleAr,
    bioEn: doctorBaseSchema.bioEn,
    bioAr: doctorBaseSchema.bioAr,
    specialty: doctorBaseSchema.specialty,
    subSpecialties: doctorBaseSchema.subSpecialties,
    cancerFocus: doctorBaseSchema.cancerFocus,
    practiceStartYear: doctorBaseSchema.practiceStartYear,
    licenseNumber: doctorBaseSchema.licenseNumber,
    createdAt: doctorBaseSchema.createdAt,
    updatedAt: doctorBaseSchema.updatedAt,
  })
  .meta({
    id: 'DoctorRes',
  });

export type DoctorRes = z.infer<typeof doctorResSchema>;
