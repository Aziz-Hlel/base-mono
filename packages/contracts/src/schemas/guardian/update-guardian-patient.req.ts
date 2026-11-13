import { z } from 'zod';
import { guardianPatientBaseSchema } from '../../base/guardian-patient.base-schema';

export const updateGuardianPatientReqSchema = z
  .object({
    relationship: guardianPatientBaseSchema.relationship,
    canViewMedicalInfo: guardianPatientBaseSchema.canViewMedicalInfo,
    canManageAppointments: guardianPatientBaseSchema.canManageAppointments,
    canManageMedications: guardianPatientBaseSchema.canManageMedications,
    receivesNotifications: guardianPatientBaseSchema.receivesNotifications,
  })
  .meta({
    id: 'UpdateGuardianPatientReq',
  });

export type UpdateGuardianPatientReq = z.infer<typeof updateGuardianPatientReqSchema>;
