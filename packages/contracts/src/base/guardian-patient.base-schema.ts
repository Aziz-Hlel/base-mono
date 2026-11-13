import z from 'zod';
import guardianLinkStatusSchema from './enums/guardian-link-status.schema';
import guardianRelationshipSchema from './enums/guardian-relationship.schema';

export const guardianPatientBaseSchema = {
  id: z.uuid(),
  relationship: guardianRelationshipSchema.nullable(),
  linkStatus: guardianLinkStatusSchema,
  canViewMedicalInfo: z.boolean(),
  canManageAppointments: z.boolean(),
  canManageMedications: z.boolean(),
  receivesNotifications: z.boolean(),
  guardianId: z.uuid(),
  patientId: z.uuid(),
};
