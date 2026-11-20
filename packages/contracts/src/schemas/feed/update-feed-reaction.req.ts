import { z } from 'zod';
import { feedReactionBaseSchema } from '../../base/feed-reaction.base-schema';

// Toggle: same reaction as the existing one → remove it,
// different reaction → switch to it, no existing reaction → add it.
export const updateFeedReactionReqSchema = z
  .object({
    reaction: feedReactionBaseSchema.reaction,
  })
  .meta({
    id: 'UpdateFeedReactionReq',
  });

export type UpdateFeedReactionReq = z.infer<typeof updateFeedReactionReqSchema>;
