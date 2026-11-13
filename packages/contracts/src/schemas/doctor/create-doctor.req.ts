import { z } from 'zod';
import { doctorBaseSchema } from '../../base/doctor.base-schema';

export const createDoctorReqSchema = z
  .object({
    titleEn: doctorBaseSchema.titleEn,
    titleAr: doctorBaseSchema.titleAr,
    bioEn: doctorBaseSchema.bioEn,
    bioAr: doctorBaseSchema.bioAr,
    specialty: doctorBaseSchema.specialty,
    subSpecialties: doctorBaseSchema.subSpecialties,
    cancerFocus: doctorBaseSchema.cancerFocus,
    practiceStartYear: doctorBaseSchema.practiceStartYear,
    licenseNumber: doctorBaseSchema.licenseNumber,
  })
  .meta({
    id: 'CreateDoctorReq',
  });

export type CreateDoctorReq = z.infer<typeof createDoctorReqSchema>;
