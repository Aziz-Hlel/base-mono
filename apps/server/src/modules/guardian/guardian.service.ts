import type { GuardianQueryParamsTypes } from '@base-monorepo-v2/contracts/schemas/guardian/get-guardians-query-params.req';
import type { Prisma } from '@base-monorepo-v2/db/prisma';
import { guardianRepo } from './guardian.repo';
import { GuardianMapper } from './guardian.mapper';
import { PageMapper } from '@/mapper/page.mapper';

class GuardianService {
  getGuardians = async (query: GuardianQueryParamsTypes['Query']) => {
    const skip = (query.page - 1) * query.size;
    const take = query.size;

    const where: Prisma.GuardianWhereInput = {};

    if (query.search && query.search.trim().length > 0) {
      const searchValue = query.search.trim().toLowerCase();
      where.user = {
        is: {
          OR: [
            { firstName: { contains: searchValue, mode: 'insensitive' } },
            { lastName: { contains: searchValue, mode: 'insensitive' } },
          ],
        },
      };
    }

    const orderBy: Prisma.GuardianOrderByWithRelationInput = {};

    // if (query.sortBy === 'firstName' || query.sortBy === 'lastName' || query.sortBy === 'gender') {
    //   orderBy.profile = {
    //     [query.sortBy]: query.order,
    //   };
    // }

    if (query.sortBy === 'createdAt') {
      orderBy[query.sortBy] = query.order;
    }

    const queriesResponse = await guardianRepo.findAll(
      {
        skip,
        take,
        where,
        orderBy,
      },
      { profile: { include: { account: { include: { avatar: true } } } } },
    );

    const teacherResponses = queriesResponse.content.map(GuardianMapper.toMinimalRes);

    const pageResponse = PageMapper.toPage({
      pagination: query,
      totalElements: queriesResponse.totalElements,
      data: teacherResponses,
    });

    return pageResponse;
  };

  getGuardianById() {}

  createGuardian() {}

  updateGuardian() {}

  deleteGuardian() {}
}

export const guardianService = new GuardianService();
