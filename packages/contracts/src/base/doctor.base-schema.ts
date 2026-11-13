import z from 'zod';
import cancerTypeSchema from './enums/cancer-type.schema';
import medicalSpecialtySchema from './enums/medical-specialty.schema';
import { zodNullableString, zodString } from './shared/string.zod';

export const doctorBaseSchema = {
  id: z.uuid(),
  titleEn: zodNullableString('English title'),
  titleAr: zodNullableString('Arabic title'),
  bioEn: zodNullableString('English bio', { max: 5000 }),
  bioAr: zodNullableString('Arabic bio', { max: 5000 }),
  specialty: medicalSpecialtySchema,
  subSpecialties: z.array(medicalSpecialtySchema),
  cancerFocus: z.array(cancerTypeSchema),
  practiceStartYear: z.number().int().nullable(),
  licenseNumber: zodString('License number'),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
};
