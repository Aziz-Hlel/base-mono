import { z } from 'zod';
import { guardianshipBaseSchema } from '../../base/guardianship.base-schema';
import { guardianMinimalResSchema } from '../guardian/guardian-minimal.res';

export const patientGuardianResSchema = z
  .object({
    id: guardianshipBaseSchema.id,
    relationship: guardianshipBaseSchema.relationship,
    linkStatus: guardianshipBaseSchema.linkStatus,
    canViewFeelingLogs: guardianshipBaseSchema.canViewFeelingLogs,
    canViewMedicalInfo: guardianshipBaseSchema.canViewMedicalInfo,
    canViewAppointments: guardianshipBaseSchema.canViewAppointments,
    canViewMedications: guardianshipBaseSchema.canViewMedications,
    canReceiveNotifications: guardianshipBaseSchema.canReceiveNotifications,
    guardian: guardianMinimalResSchema,
  })
  .meta({
    id: 'PatientGuardianRes',
    description: 'Guardianship link of a patient with the guardian info',
  });

export type PatientGuardianRes = z.infer<typeof patientGuardianResSchema>;
