import { z } from 'zod';
import { diaryNoteBaseSchema } from '../../base/diary-note.base-schema';

export const createDiaryNoteReqSchema = z
  .object({
    title: diaryNoteBaseSchema.title,
    text: diaryNoteBaseSchema.text,
    media: diaryNoteBaseSchema.media,
  })
  .meta({
    id: 'CreateDiaryNoteReq',
  });

export type CreateDiaryNoteReq = z.infer<typeof createDiaryNoteReqSchema>;
