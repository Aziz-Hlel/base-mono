import { z } from 'zod';
import { guardianshipBaseSchema } from '../../base/guardianship.base-schema';

export const patientGuardiansParamsSchema = z
  .object({
    patientId: guardianshipBaseSchema.patientId,
  })
  .meta({
    id: 'PatientGuardiansParams',
  });

export type PatientGuardiansParams = z.infer<typeof patientGuardiansParamsSchema>;
