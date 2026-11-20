import { z } from 'zod';
import { diaryNoteResSchema } from './diary-note.res';

export const listDiaryNoteResSchema = z.array(diaryNoteResSchema).meta({
  id: 'ListDiaryNoteRes',
  description: 'Cursor page of diary notes, newest first',
});

export type ListDiaryNoteRes = z.infer<typeof listDiaryNoteResSchema>;
