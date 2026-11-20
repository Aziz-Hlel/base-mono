import z from 'zod';
import reactionTypeSchema from './enums/reaction-type.schema';

export const feedReactionBaseSchema = {
  feedId: z.uuid(),
  profileId: z.uuid(),
  reaction: reactionTypeSchema,
  createdAt: z.iso.datetime(),
};
