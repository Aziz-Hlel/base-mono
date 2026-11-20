import prisma from '@/db';
import { parseISODate } from '@base-monorepo-v2/contracts/utils/dayjs/utc';
import { profileSeedData } from '../data/dev';

class ProfileSeedService {
  public async seed() {
    const data = Object.values(profileSeedData).map((profile) => ({
      ...profile,
      birthday: parseISODate(profile.birthday),
    }));

    await prisma.profile.createMany({ data, skipDuplicates: true });
  }
}

export const profileSeedService = new ProfileSeedService();
