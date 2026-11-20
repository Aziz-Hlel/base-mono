import { z } from 'zod';
import { createDiaryNoteReqSchema } from './create-diary-note.req';

export const updateDiaryNoteReqSchema = createDiaryNoteReqSchema.meta({
  id: 'UpdateDiaryNoteReq',
});

export type UpdateDiaryNoteReq = z.infer<typeof updateDiaryNoteReqSchema>;
