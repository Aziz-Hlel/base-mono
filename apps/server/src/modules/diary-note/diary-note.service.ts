import prisma from '@/db';
import { BadRequestException, NotFoundException } from '@/exceptions';
import { CursorMapper } from '@/mapper/cursor.mapper';
import { ERROR_CODES } from '@base-monorepo-v2/contracts/exceptions/codes';
import type { CreateDiaryNoteReq } from '@base-monorepo-v2/contracts/schemas/diary-note/create-diary-note.req';
import type { UpdateDiaryNoteReq } from '@base-monorepo-v2/contracts/schemas/diary-note/update-diary-note.req';
import type { CursorQueryParams } from '@base-monorepo-v2/contracts/types/Cursor';
import { MediaStatus, type Prisma } from '@base-monorepo-v2/db/prisma';
import { DiaryNoteMapper } from './diary-note.mapper';

const include = { media: true } as const satisfies Prisma.DiaryNotesInclude;

class DiaryNoteService {
  listByCursor = async (profileId: string, query: CursorQueryParams) => {
    const where: Prisma.DiaryNotesWhereInput = {
      profileId,
    };

    const queryResponse = await prisma.diaryNotes.findMany({
      where,
      include,
      cursor: query.cursor ? { id: query.cursor } : undefined,
      orderBy: [{ createdAt: 'desc' }],
      take: query.limit + 1,
    });

    const lastItem = queryResponse[query.limit];

    const nextCursor = lastItem?.id ?? null;

    const data = queryResponse.slice(0, query.limit).map(DiaryNoteMapper.toRes);

    return CursorMapper.toCursor({
      data,
      nextCursor,
      limit: query.limit,
    });
  };

  getById = async (id: string, profileId: string) => {
    const diaryNote = await prisma.diaryNotes.findFirst({
      where: { id, profileId },
      include,
    });

    if (!diaryNote) {
      throw new NotFoundException(`Diary note with id ${id} not found`, {
        code: ERROR_CODES.DIARY_NOTE.NOT_FOUND,
      });
    }

    return DiaryNoteMapper.toRes(diaryNote);
  };

  create = async (profileId: string, data: CreateDiaryNoteReq) => {
    await this.assertMediaExists(data.media);

    const diaryNote = await prisma.diaryNotes.create({
      data: {
        profileId,
        title: data.title,
        text: data.text,
        media: { connect: data.media.map((id) => ({ id })) },
      },
      include,
    });

    return DiaryNoteMapper.toRes(diaryNote);
  };

  update = async (id: string, profileId: string, data: UpdateDiaryNoteReq) => {
    const existing = await prisma.diaryNotes.findFirst({
      where: { id, profileId },
    });

    if (!existing) {
      throw new NotFoundException(`Diary note with id ${id} not found`, {
        code: ERROR_CODES.DIARY_NOTE.NOT_FOUND,
      });
    }

    await this.assertMediaExists(data.media);

    const diaryNote = await prisma.diaryNotes.update({
      where: { id },
      data: {
        title: data.title,
        text: data.text,
        media: { set: data.media.map((id) => ({ id })) },
      },
      include,
    });

    return DiaryNoteMapper.toRes(diaryNote);
  };

  delete = async (id: string, profileId: string) => {
    const existing = await prisma.diaryNotes.findFirst({
      where: { id, profileId },
      select: { id: true },
    });

    if (!existing) {
      throw new NotFoundException(`Diary note with id ${id} not found`, {
        code: ERROR_CODES.DIARY_NOTE.NOT_FOUND,
      });
    }

    await prisma.diaryNotes.delete({ where: { id } });

    return null;
  };

  private assertMediaExists = async (mediaIds: string[]) => {
    const uniqueIds = [...new Set(mediaIds)];
    if (uniqueIds.length === 0) return;

    const count = await prisma.media.count({
      where: { id: { in: uniqueIds }, status: { not: MediaStatus.DELETED } },
    });

    if (count !== uniqueIds.length) {
      throw new BadRequestException('One or more media items do not exist', {
        code: ERROR_CODES.DIARY_NOTE.INVALID_MEDIA,
      });
    }
  };
}

export const diaryNoteService = new DiaryNoteService();
