import { z } from 'zod';
import { guardianshipBaseSchema } from '../../base/guardianship.base-schema';

export const guardianshipResSchema = z
  .object({
    id: guardianshipBaseSchema.id,
    relationship: guardianshipBaseSchema.relationship,
    linkStatus: guardianshipBaseSchema.linkStatus,
    canViewMedicalInfo: guardianshipBaseSchema.canViewMedicalInfo,
    canManageAppointments: guardianshipBaseSchema.canManageAppointments,
    canManageMedications: guardianshipBaseSchema.canManageMedications,
    receivesNotifications: guardianshipBaseSchema.receivesNotifications,
    guardianId: guardianshipBaseSchema.guardianId,
    patientId: guardianshipBaseSchema.patientId,
  })
  .meta({
    id: 'GuardianshipRes',
  });

export type GuardianshipRes = z.infer<typeof guardianshipResSchema>;
