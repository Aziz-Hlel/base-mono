import { z } from 'zod';
import { patientBaseSchema } from '../../base/patient.base-schema';

export const patientResSchema = z
  .object({
    id: patientBaseSchema.id,
    cancerType: patientBaseSchema.cancerType,
    cancerSubtype: patientBaseSchema.cancerSubtype,
    cancerStage: patientBaseSchema.cancerStage,
    journeyStage: patientBaseSchema.journeyStage,
    allergies: patientBaseSchema.allergies,
    dietaryRestrictions: patientBaseSchema.dietaryRestrictions,
    activityLevel: patientBaseSchema.activityLevel,
    createdAt: patientBaseSchema.createdAt,
    updatedAt: patientBaseSchema.updatedAt,
  })
  .meta({
    id: 'PatientRes',
  });

export type PatientRes = z.infer<typeof patientResSchema>;
