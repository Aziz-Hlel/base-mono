import { z } from 'zod';
import { guardianshipBaseSchema } from '../../base/guardianship.base-schema';

export const patientGuardianParamsSchema = z
  .object({
    patientId: guardianshipBaseSchema.patientId,
    guardianId: guardianshipBaseSchema.guardianId,
  })
  .meta({
    id: 'PatientGuardianParams',
  });

export type PatientGuardianParams = z.infer<typeof patientGuardianParamsSchema>;
