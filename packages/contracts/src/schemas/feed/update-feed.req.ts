import { z } from 'zod';
import { feedBaseSchema } from '../../base/feed.base-schema';

export const updateFeedReqSchema = z
  .object({
    status: feedBaseSchema.status.optional(),
    isPinned: feedBaseSchema.isPinned.optional(),
    journeyStage: feedBaseSchema.journeyStage.optional(),
    relationShip: feedBaseSchema.relationShip.optional(),
  })
  .meta({
    id: 'UpdateFeedReq',
  });

export type UpdateFeedReq = z.infer<typeof updateFeedReqSchema>;
