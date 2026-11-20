import { z } from 'zod';
import { diaryNoteBaseSchema } from '../../base/diary-note.base-schema';

// /profile/:profileId/diary-notes/:id
export const diaryNoteIdParamSchema = z
  .object({
    profileId: diaryNoteBaseSchema.profileId,
    id: diaryNoteBaseSchema.id,
  })
  .meta({
    id: 'DiaryNoteIdParam',
  });

export type DiaryNoteIdParam = z.infer<typeof diaryNoteIdParamSchema>;
