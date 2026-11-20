import { z } from 'zod';
import { guardianshipBaseSchema } from '../../base/guardianship.base-schema';

export const updateGuardianshipReqSchema = z
  .object({
    relationship: guardianshipBaseSchema.relationship,
    canViewFeelingLogs: guardianshipBaseSchema.canViewFeelingLogs,
    canViewDiaryNotes: guardianshipBaseSchema.canViewDiaryNotes,
    canViewMedicalInfo: guardianshipBaseSchema.canViewMedicalInfo,
    canManageAppointments: guardianshipBaseSchema.canManageAppointments,
    canManageMedications: guardianshipBaseSchema.canManageMedications,
    receivesNotifications: guardianshipBaseSchema.receivesNotifications,
  })
  .meta({
    id: 'UpdateGuardianshipReq',
  });

export type UpdateGuardianshipReq = z.infer<typeof updateGuardianshipReqSchema>;
