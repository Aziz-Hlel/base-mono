import { DiaryNoteMapper, diaryNoteWithOwnerInclude } from '@/modules/diary-note/diary-note.mapper';
import type { FeedReactionRes, FeedRes } from '@base-monorepo-v2/contracts/schemas/feed/feed.res';
import { ReactionType, type Prisma } from '@base-monorepo-v2/db/prisma';

export const feedInclude = {
  feedLikes: { select: { profileId: true, reaction: true } },
  diaryNote: { include: diaryNoteWithOwnerInclude },
} as const satisfies Prisma.FeedInclude;

export class FeedMapper {
  static toReactionRes = (
    reactions: Pick<Prisma.FeedReactionGetPayload<{}>, 'profileId' | 'reaction'>[],
    profileId: string,
  ): FeedReactionRes => {
    const res: FeedReactionRes = {
      [ReactionType.HEART]: 0,
      [ReactionType.LIKE]: 0,
      userReaction: null,
    };

    for (const { reaction, profileId: reactorId } of reactions) {
      res[reaction] += 1;
      if (reactorId === profileId) res.userReaction = reaction;
    }

    return res;
  };

  static toRes = (
    feed: Prisma.FeedGetPayload<{ include: typeof feedInclude }>,
    profileId: string,
  ): FeedRes => ({
    id: feed.id,
    diaryNote: DiaryNoteMapper.toWithOwnerRes(feed.diaryNote),
    status: feed.status,
    isPinned: feed.isPinned,
    journeyStage: feed.journeyStage,
    relationShip: feed.relationShip,
    reaction: FeedMapper.toReactionRes(feed.feedLikes, profileId),
    approvedAt: feed.approvedAt?.toISOString() ?? null,
    createdAt: feed.createdAt.toISOString(),
    updatedAt: feed.updatedAt.toISOString(),
  });
}
