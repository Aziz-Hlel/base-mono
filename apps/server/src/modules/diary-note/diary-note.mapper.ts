import { mediaService } from '@/modules/media/media.service';
import { ProfileMapper } from '@/modules/profile/profile.mapper';
import type { DiaryNoteWithOwnerRes } from '@base-monorepo-v2/contracts/schemas/diary-note/diary-note-with-owner.res';
import type { DiaryNoteRes } from '@base-monorepo-v2/contracts/schemas/diary-note/diary-note.res';
import type { Prisma } from '@base-monorepo-v2/db/prisma';

export const diaryNoteWithOwnerInclude = {
  media: true,
  profile: { include: { avatar: true } },
} as const satisfies Prisma.DiaryNotesInclude;

export class DiaryNoteMapper {
  static toRes = (
    diaryNote: Prisma.DiaryNotesGetPayload<{ include: { media: true } }>,
  ): DiaryNoteRes => ({
    id: diaryNote.id,
    profileId: diaryNote.profileId,
    title: diaryNote.title,
    text: diaryNote.text,
    media: diaryNote.media.map((media) => mediaService.toMediaRes(media)),
    createdAt: diaryNote.createdAt.toISOString(),
    updatedAt: diaryNote.updatedAt.toISOString(),
  });

  static toWithOwnerRes = (
    diaryNote: Prisma.DiaryNotesGetPayload<{ include: typeof diaryNoteWithOwnerInclude }>,
  ): DiaryNoteWithOwnerRes => ({
    ...DiaryNoteMapper.toRes(diaryNote),
    profile: ProfileMapper.toMinimalRes(diaryNote.profile),
  });
}
