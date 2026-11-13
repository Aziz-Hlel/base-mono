import prisma from '@/db';
import type { Prisma } from '@base-monorepo-v2/db/prisma';

class GuardianRepo {
  findAll = async <T extends Prisma.GuardianInclude>(
    params: {
      skip: number;
      take: number;
      where: Prisma.GuardianWhereInput;
      orderBy: Prisma.GuardianOrderByWithRelationInput;
    },
    include: T,
  ) => {
    const { skip, take, where, orderBy } = params;
    const query = prisma.guardian.findMany({
      skip,
      take,
      where,
      include,
      orderBy,
    });
    const queryCount = prisma.guardian.count({ where });

    const [content, totalElements] = await Promise.all([query, queryCount]);

    return { content, totalElements };
  };
}

export const guardianRepo = new GuardianRepo();
