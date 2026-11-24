import { z } from 'zod';
import { guardianshipBaseSchema } from '../../base/guardianship.base-schema';

export const updateGuardianshipReqSchema = z
  .object({
    relationship: guardianshipBaseSchema.relationship,
    canViewFeelingLogs: guardianshipBaseSchema.canViewFeelingLogs,
    canViewDiaryNotes: guardianshipBaseSchema.canViewDiaryNotes,
    canViewMedicalInfo: guardianshipBaseSchema.canViewMedicalInfo,
    canViewAppointments: guardianshipBaseSchema.canViewAppointments,
    canViewMedications: guardianshipBaseSchema.canViewMedications,
    canReceiveNotifications: guardianshipBaseSchema.canReceiveNotifications,
  })
  .meta({
    id: 'UpdateGuardianshipReq',
  });

export type UpdateGuardianshipReq = z.infer<typeof updateGuardianshipReqSchema>;
