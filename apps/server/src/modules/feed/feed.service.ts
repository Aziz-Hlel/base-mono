import prisma from '@/db';
import { ConflictException, NotFoundException } from '@/exceptions';
import { CursorMapper } from '@/mapper/cursor.mapper';
import { ERROR_CODES } from '@base-monorepo-v2/contracts/exceptions/codes';
import type { CreateFeedReq } from '@base-monorepo-v2/contracts/schemas/feed/create-feed.req';
import type { UpdateFeedReq } from '@base-monorepo-v2/contracts/schemas/feed/update-feed.req';
import type { CursorQueryParams } from '@base-monorepo-v2/contracts/types/Cursor';
import { FeedStatus, type Prisma } from '@base-monorepo-v2/db/prisma';
import { FeedMapper, feedInclude } from './feed.mapper';

class FeedService {
  create = async (profileId: string, data: CreateFeedReq) => {
    const diaryNote = await prisma.diaryNotes.findFirst({
      where: { id: data.diaryNoteId, profileId },
      select: { id: true, feed: { select: { id: true } } },
    });

    if (!diaryNote) {
      throw new NotFoundException(`Diary note with id ${data.diaryNoteId} not found`, {
        code: ERROR_CODES.DIARY_NOTE.NOT_FOUND,
      });
    }

    if (diaryNote.feed) {
      throw new ConflictException('This diary note is already shared to the feed', {
        code: ERROR_CODES.FEED.ALREADY_EXISTS,
      });
    }

    const feed = await prisma.feed.create({
      data: {
        id: data.diaryNoteId,
        journeyStage: data.journeyStage,
        relationShip: data.relationShip,
      },
      include: feedInclude,
    });

    return FeedMapper.toRes(feed, profileId);
  };

  update = async (id: string, data: UpdateFeedReq) => {
    const existing = await prisma.feed.findUnique({
      where: { id },
      select: { status: true, diaryNote: { select: { profileId: true } } },
    });

    if (!existing) {
      throw new NotFoundException(`Feed with id ${id} not found`, {
        code: ERROR_CODES.FEED.NOT_FOUND,
      });
    }

    const approvedAt =
      existing.status !== FeedStatus.APPROVED && data.status === FeedStatus.APPROVED
        ? new Date()
        : data.status !== FeedStatus.APPROVED
          ? null
          : undefined;

    await prisma.feed.update({
      where: { id },
      data: {
        status: data.status,
        isPinned: data.isPinned,
        journeyStage: data.journeyStage,
        relationShip: data.relationShip,
        approvedAt,
      },
      include: feedInclude,
    });

    return null;
  };

  delete = async (id: string) => {
    const existing = await prisma.feed.findUnique({ where: { id }, select: { id: true } });

    if (!existing) {
      throw new NotFoundException(`Feed with id ${id} not found`, {
        code: ERROR_CODES.FEED.NOT_FOUND,
      });
    }

    await prisma.feed.delete({ where: { id } });

    return null;
  };

  listByCursor = async (
    query: CursorQueryParams,
    viewer: { profileId: string; isAdmin: boolean },
  ) => {
    const { profileId } = viewer;
    const where: Prisma.FeedWhereInput = viewer.isAdmin ? {} : { status: FeedStatus.APPROVED };

    const queryResponse = await prisma.feed.findMany({
      where,
      include: feedInclude,
      cursor: query.cursor ? { id: query.cursor } : undefined,
      orderBy: [{ isPinned: 'desc' }, { approvedAt: 'desc' }, { id: 'desc' }],
      take: query.limit + 1,
    });

    const lastItem = queryResponse[query.limit];

    const nextCursor = lastItem?.id ?? null;

    const data = queryResponse
      .slice(0, query.limit)
      .map((feed) => FeedMapper.toRes(feed, profileId));

    return CursorMapper.toCursor({
      data,
      nextCursor,
      limit: query.limit,
    });
  };

  getById = async (id: string, viewer: { profileId: string; isAdmin: boolean }) => {
    const feed = await prisma.feed.findUnique({
      where: { id },
      include: feedInclude,
    });

    const canView =
      feed &&
      (feed.status === FeedStatus.APPROVED ||
        viewer.isAdmin ||
        feed.diaryNote.profileId === viewer.profileId);

    if (!canView) {
      throw new NotFoundException(`Feed with id ${id} not found`, {
        code: ERROR_CODES.FEED.NOT_FOUND,
      });
    }

    return FeedMapper.toRes(feed, viewer.profileId);
  };
}

export const feedService = new FeedService();
