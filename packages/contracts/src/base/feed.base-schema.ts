import z from 'zod';
import feedStatusSchema from './enums/feed-status.schema';
import guardianRelationshipSchema from './enums/guardian-relationship.schema';
import journeyStageSchema from './enums/journey-stage.schema';

export const feedBaseSchema = {
  id: z.uuid(),
  diaryNoteId: z.uuid(),
  status: feedStatusSchema,
  isPinned: z.boolean(),
  approvedAt: z.iso.datetime().nullable(),
  journeyStage: journeyStageSchema,
  relationShip: guardianRelationshipSchema.nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
};
