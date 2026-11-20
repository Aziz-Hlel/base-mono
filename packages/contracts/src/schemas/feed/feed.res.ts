import { ReactionType } from '@base-monorepo-v2/db/prisma';
import { z } from 'zod';
import reactionTypeSchema from '../../base/enums/reaction-type.schema';
import { feedBaseSchema } from '../../base/feed.base-schema';
import { diaryNoteWithOwnerResSchema } from '../diary-note/diary-note-with-owner.res';

export const feedReactionResSchema = z
  .object({
    [ReactionType.HEART]: z.int(),
    [ReactionType.LIKE]: z.int(),
    userReaction: reactionTypeSchema.nullable(),
  })
  .meta({ id: 'FeedReactionRes' });

export type FeedReactionRes = z.infer<typeof feedReactionResSchema>;

export const feedResSchema = z
  .object({
    id: feedBaseSchema.id,
    diaryNote: diaryNoteWithOwnerResSchema,
    status: feedBaseSchema.status,
    isPinned: feedBaseSchema.isPinned,
    journeyStage: feedBaseSchema.journeyStage,
    relationShip: feedBaseSchema.relationShip,
    reaction: feedReactionResSchema,
    approvedAt: feedBaseSchema.approvedAt,
    createdAt: feedBaseSchema.createdAt,
    updatedAt: feedBaseSchema.updatedAt,
  })
  .meta({
    id: 'FeedRes',
  });

export type FeedRes = z.infer<typeof feedResSchema>;
