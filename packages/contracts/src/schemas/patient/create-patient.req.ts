import { z } from 'zod';
import { patientBaseSchema } from '../../base/patient.base-schema';

export const createPatientReqSchema = z
  .object({
    cancerType: patientBaseSchema.cancerType,
    cancerSubtype: patientBaseSchema.cancerSubtype,
    cancerStage: patientBaseSchema.cancerStage,
    journeyStage: patientBaseSchema.journeyStage,
    allergies: patientBaseSchema.allergies,
    dietaryRestrictions: patientBaseSchema.dietaryRestrictions,
    activityLevel: patientBaseSchema.activityLevel,
  })
  .meta({
    id: 'CreatePatientReq',
  });

export type CreatePatientReq = z.infer<typeof createPatientReqSchema>;
