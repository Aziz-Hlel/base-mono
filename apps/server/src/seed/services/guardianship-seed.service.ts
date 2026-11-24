import prisma from '@/db';
import { guardianshipSeedData } from '../data/dev/actors';

class GuardianshipSeedService {
  public async seed() {
    const data = Object.values(guardianshipSeedData);

    await prisma.guardianship.createMany({ data, skipDuplicates: true });
  }
}

export const guardianshipSeedService = new GuardianshipSeedService();
