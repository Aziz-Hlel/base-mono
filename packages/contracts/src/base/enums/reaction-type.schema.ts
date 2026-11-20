import { ReactionType } from '@base-monorepo-v2/db/prisma';
import z from 'zod';

const reactionTypeSchema = z.enum(ReactionType).meta({
  id: 'ReactionType',
});

export default reactionTypeSchema;
