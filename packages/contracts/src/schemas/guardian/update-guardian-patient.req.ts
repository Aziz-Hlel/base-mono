import { z } from 'zod';
import { guardianPatientBaseSchema } from '../../base/guardian-patient.base-schema';

export const updateGuardianPatientParamsSchema = z
  .object({
    guardianId: guardianPatientBaseSchema.guardianId,
    patientId: guardianPatientBaseSchema.patientId,
  })
  .meta({
    id: 'UpdateGuardianPatientParams',
  });

export type UpdateGuardianPatientParams = z.infer<typeof updateGuardianPatientParamsSchema>;

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
