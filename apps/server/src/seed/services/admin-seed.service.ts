import prisma from '@/db';
import { passwordService } from '@/modules/auth/password.service';
import { adminSeedData } from '../data/shared';

class AdminSeedService {
  seed = async () => {
    const admins = await Promise.all(
      adminSeedData.map(async (admin) => ({
        ...admin,
        password: admin.password ? await passwordService.hashPassword(admin.password) : null,
      })),
    );

    await prisma.user.createMany({
      data: admins,
      skipDuplicates: true,
    });
  };
}

export const adminSeedService = new AdminSeedService();
