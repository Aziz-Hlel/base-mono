import { z } from 'zod';
import { guardianPatientBaseSchema } from '../../base/guardian-patient.base-schema';

export const guardianPatientResSchema = z
  .object({
    id: guardianPatientBaseSchema.id,
    relationship: guardianPatientBaseSchema.relationship,
    linkStatus: guardianPatientBaseSchema.linkStatus,
    canViewMedicalInfo: guardianPatientBaseSchema.canViewMedicalInfo,
    canManageAppointments: guardianPatientBaseSchema.canManageAppointments,
    canManageMedications: guardianPatientBaseSchema.canManageMedications,
    receivesNotifications: guardianPatientBaseSchema.receivesNotifications,
    guardianId: guardianPatientBaseSchema.guardianId,
    patientId: guardianPatientBaseSchema.patientId,
  })
  .meta({
    id: 'GuardianPatientRes',
  });

export type GuardianPatientRes = z.infer<typeof guardianPatientResSchema>;
