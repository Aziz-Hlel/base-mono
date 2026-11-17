import { z } from 'zod';
import { patientBaseSchema } from '../../base/patient.base-schema';

export const patientIdParamSchema = z
  .object({
    id: patientBaseSchema.id,
  })
  .meta({
    id: 'PatientIdParam',
  });

export type PatientIdParam = z.infer<typeof patientIdParamSchema>;
