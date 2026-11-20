import prisma from '@/db';
import { ConflictException, NotFoundException } from '@/exceptions';
import { CursorMapper } from '@/mapper/cursor.mapper';
import { ERROR_CODES } from '@base-monorepo-v2/contracts/exceptions/codes';
import type { CreateFeedReq } from '@base-monorepo-v2/contracts/schemas/feed/create-feed.req';
import { randomUUID } from 'node:crypto';
import type { CursorQueryParams } from '@base-monorepo-v2/contracts/types/Cursor';
import { FeedStatus, type Prisma } from '@base-monorepo-v2/db/prisma';
import { FeedMapper, feedInclude } from './feed.mapper';

class FeedService {
  /**
   * Shares one of the current user's diary notes to the feed.
   * New posts start as PENDING until reviewed; a note can only be shared once.
   */
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
        id: randomUUID(),
        diaryNoteId: data.diaryNoteId,
        journeyStage: data.journeyStage,
        relationShip: data.relationShip,
      },
      include: feedInclude,
    });

    return FeedMapper.toRes(feed, profileId);
  };

  /**
   * Public feed: approved posts only, pinned first, then newest.
   */
  listByCursor = async (profileId: string, query: CursorQueryParams) => {
    const where: Prisma.FeedWhereInput = {
      status: FeedStatus.APPROVED,
    };

    const queryResponse = await prisma.feed.findMany({
      where,
      include: feedInclude,
      cursor: query.cursor ? { id: query.cursor } : undefined,
      // id as a tie-breaker keeps the order stable across pages
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

  /**
   * Approved feeds are visible to everyone. Pending/rejected feeds are only
   * visible to their author and admins (otherwise reported as not found).
   */
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
