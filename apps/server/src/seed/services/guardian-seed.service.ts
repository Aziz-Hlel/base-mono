import prisma from '@/db';
import { guardianSeedData } from '../data/dev';

class GuardianSeedService {
  public async seed() {
    const data = Object.values(guardianSeedData);

    await prisma.guardian.createMany({ data, skipDuplicates: true });
  }
}

export const guardianSeedService = new GuardianSeedService();
