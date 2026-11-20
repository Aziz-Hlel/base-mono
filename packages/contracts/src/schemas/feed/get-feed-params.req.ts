import { z } from 'zod';
import { feedBaseSchema } from '../../base/feed.base-schema';

export const feedIdParamSchema = z
  .object({
    id: feedBaseSchema.id,
  })
  .meta({
    id: 'FeedIdParam',
  });

export type FeedIdParam = z.infer<typeof feedIdParamSchema>;
