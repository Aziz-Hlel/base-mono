import { z } from 'zod';
import { diaryNoteBaseSchema } from '../../base/diary-note.base-schema';

// /profile/:profileId/diary-notes
export const listDiaryNoteParamsSchema = z
  .object({
    profileId: diaryNoteBaseSchema.profileId,
  })
  .meta({
    id: 'ListDiaryNoteParams',
  });

export type ListDiaryNoteParams = z.infer<typeof listDiaryNoteParamsSchema>;
