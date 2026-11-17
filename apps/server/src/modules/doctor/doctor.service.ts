import prisma from '@/db';
import { NotFoundException } from '@/exceptions';
import { PageMapper } from '@/mapper/page.mapper';
import type { DoctorQueryParamsTypes } from '@base-monorepo-v2/contracts/schemas/doctor/get-doctors-query-params.req';
import type { UpdateDoctorReq } from '@base-monorepo-v2/contracts/schemas/doctor/update-doctor.req';
import type { Prisma } from '@base-monorepo-v2/db/prisma';
import { DoctorMapper } from './doctor.mapper';

class DoctorService {
  listAll = async (query: DoctorQueryParamsTypes['Query']) => {
    const skip = (query.page - 1) * query.size;
    const take = query.size;

    const where: Prisma.DoctorWhereInput = {};

    if (query.search && query.search.trim().length > 0) {
      const searchValue = query.search.trim().toLowerCase();
      where.profile = {
        is: {
          OR: [
            { firstName: { contains: searchValue, mode: 'insensitive' } },
            { lastName: { contains: searchValue, mode: 'insensitive' } },
          ],
        },
      };
    }

    const orderBy: Prisma.DoctorOrderByWithRelationInput = {};

    if (query.sortBy === 'createdAt') {
      orderBy[query.sortBy] = query.order;
    }

    const [content, totalElements] = await Promise.all([
      prisma.doctor.findMany({
        skip,
        take,
        where,
        orderBy,
        include: {
          profile: {
            include: {
              user: true,
              avatar: true,
            },
          },
        },
      }),
      prisma.doctor.count({ where }),
    ]);

    const data = content.map(DoctorMapper.toMinimalRes);

    const pageResponse = PageMapper.toPageRes({
      query,
      totalElements,
      data,
    });

    return pageResponse;
  };

  getById = async (id: string) => {
    const doctor = await prisma.doctor.findUnique({
      where: { id },
      include: {
        profile: {
          include: {
            user: true,
            avatar: true,
          },
        },
      },
    });

    if (!doctor) {
      throw new NotFoundException(`Doctor with id ${id} not found`);
    }

    return DoctorMapper.toDetailedRes(doctor);
  };

  update = async (id: string, data: UpdateDoctorReq) => {
    const existing = await prisma.doctor.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Doctor with id ${id} not found`);
    }

    const updatedDoctor = await prisma.doctor.update({
      where: { id },
      data,
      include: {
        profile: {
          include: {
            user: true,
            avatar: true,
          },
        },
      },
    });

    return DoctorMapper.toDetailedRes(updatedDoctor);
  };
}

export const doctorService = new DoctorService();
