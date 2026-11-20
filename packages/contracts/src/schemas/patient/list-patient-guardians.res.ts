import { z } from 'zod';
import { patientGuardianResSchema } from './patient-guardian.res';

export const listPatientGuardiansResSchema = z.array(patientGuardianResSchema).meta({
  id: 'ListPatientGuardiansRes',
  description: 'List of guardians linked to a patient',
});

export type ListPatientGuardiansRes = z.infer<typeof listPatientGuardiansResSchema>;
