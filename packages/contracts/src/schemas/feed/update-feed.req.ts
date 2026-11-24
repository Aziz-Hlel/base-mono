import { z } from 'zod';
import { feedBaseSchema } from '../../base/feed.base-schema';

export const updateFeedReqSchema = z
  .object({
    status: feedBaseSchema.status,
    isPinned: feedBaseSchema.isPinned,
    journeyStage: feedBaseSchema.journeyStage,
    relationShip: feedBaseSchema.relationShip,
  })
  .meta({
    id: 'UpdateFeedReq',
  });

export type UpdateFeedReq = z.infer<typeof updateFeedReqSchema>;
