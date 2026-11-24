import prisma from '@/db';
import { feedSeedData } from '../data/dev/feed.data';

class FeedSeedService {
  public async seed() {
    const data = Object.values(feedSeedData);

    await prisma.feed.createMany({ data, skipDuplicates: true });
  }
}

export const feedSeedService = new FeedSeedService();
