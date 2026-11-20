import { z } from 'zod';
import { profileMinimalResSchema } from '../profile/profile-minimal.res';
import { diaryNoteResSchema } from './diary-note.res';

export const diaryNoteWithOwnerResSchema = diaryNoteResSchema
  .extend({
    profile: profileMinimalResSchema,
  })
  .meta({
    id: 'DiaryNoteWithOwnerRes',
  });

export type DiaryNoteWithOwnerRes = z.infer<typeof diaryNoteWithOwnerResSchema>;
