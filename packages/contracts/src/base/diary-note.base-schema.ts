import z from 'zod';
import { zodString } from './shared/string.zod';

export const diaryNoteBaseSchema = {
  id: z.uuid(),
  title: zodString('Title'),
  text: zodString('Text', { min: 1, max: 10000 }),
  profileId: z.uuid(),
  media: z.array(z.uuid()),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
};
