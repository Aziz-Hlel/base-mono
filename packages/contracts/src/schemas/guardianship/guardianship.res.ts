import { z } from 'zod';
import { guardianshipBaseSchema } from '../../base/guardianship.base-schema';

export const guardianshipResSchema = z
  .object({
    id: guardianshipBaseSchema.id,
    relationship: guardianshipBaseSchema.relationship,
    linkStatus: guardianshipBaseSchema.linkStatus,
    canViewFeelingLogs: guardianshipBaseSchema.canViewFeelingLogs,
    canViewDiaryNotes: guardianshipBaseSchema.canViewDiaryNotes,
    canViewMedicalInfo: guardianshipBaseSchema.canViewMedicalInfo,
    canViewAppointments: guardianshipBaseSchema.canViewAppointments,
    canViewMedications: guardianshipBaseSchema.canViewMedications,
    canReceiveNotifications: guardianshipBaseSchema.canReceiveNotifications,
  })
  .meta({
    id: 'GuardianshipRes',
  });

export type GuardianshipRes = z.infer<typeof guardianshipResSchema>;
