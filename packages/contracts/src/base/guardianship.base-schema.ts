import z from 'zod';
import guardianLinkStatusSchema from './enums/guardian-link-status.schema';
import guardianRelationshipSchema from './enums/guardian-relationship.schema';

export const guardianshipBaseSchema = {
  id: z.uuid(),
  relationship: guardianRelationshipSchema.nullable(),
  linkStatus: guardianLinkStatusSchema,
  canViewFeelingLogs: z.boolean(),
  canViewDiaryNotes: z.boolean(),
  canViewMedicalInfo: z.boolean(),
  canViewAppointments: z.boolean(),
  canViewMedications: z.boolean(),
  canReceiveNotifications: z.boolean(),
  guardianId: z.uuid(),
  patientId: z.uuid(),
};
