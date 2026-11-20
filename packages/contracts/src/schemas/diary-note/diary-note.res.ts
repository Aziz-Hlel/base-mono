import { z } from 'zod';
import { diaryNoteBaseSchema } from '../../base/diary-note.base-schema';
import { mediaResponseSchema } from '../media/media.res';

export const diaryNoteResSchema = z
  .object({
    id: diaryNoteBaseSchema.id,
    profileId: diaryNoteBaseSchema.profileId,
    title: diaryNoteBaseSchema.title,
    text: diaryNoteBaseSchema.text,
    media: z.array(mediaResponseSchema),
    createdAt: diaryNoteBaseSchema.createdAt,
    updatedAt: diaryNoteBaseSchema.updatedAt,
  })
  .meta({
    id: 'DiaryNoteRes',
  });

export type DiaryNoteRes = z.infer<typeof diaryNoteResSchema>;
