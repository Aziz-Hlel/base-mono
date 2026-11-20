import { z } from 'zod';
import { feedBaseSchema } from '../../base/feed.base-schema';

export const createFeedReqSchema = z
  .object({
    diaryNoteId: feedBaseSchema.diaryNoteId,
    journeyStage: feedBaseSchema.journeyStage,
    relationShip: feedBaseSchema.relationShip,
  })
  .meta({
    id: 'CreateFeedReq',
  });

export type CreateFeedReq = z.infer<typeof createFeedReqSchema>;
