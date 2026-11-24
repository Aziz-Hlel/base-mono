import prisma from '@/db';
import { passwordService } from '@/modules/auth/password.service';
import { userSeedData } from '../data/dev/actors';

class UserSeedService {
  public async seed() {
    const hashCache = new Map<string, string>();
    const hash = async (pw: string) => {
      if (!hashCache.has(pw)) hashCache.set(pw, await passwordService.hashPassword(pw));
      return hashCache.get(pw)!;
    };

    const data = await Promise.all(
      Object.values(userSeedData).map(async (u) => ({ ...u, password: await hash(u.password) })),
    );

    await prisma.user.createMany({ data, skipDuplicates: true });
  }
}

export const userSeedService = new UserSeedService();
