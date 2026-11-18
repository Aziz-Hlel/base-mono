import prisma from '@/db';
import { isUniqueViolationOn } from '@/db/errors/helper';
import { ConflictException, ForbiddenException, NotFoundException } from '@/exceptions';
import { PageMapper } from '@/mapper/page.mapper';
import { passwordService } from '@/modules/auth/password.service';
import { ERROR_CODES } from '@base-monorepo-v2/contracts/exceptions/codes';
import type { GuardianQueryParamsTypes } from '@base-monorepo-v2/contracts/schemas/guardian/get-guardians-query-params.req';
import type { LinkPatientGuardianReq } from '@base-monorepo-v2/contracts/schemas/guardian/link-patient-guardian.req';
import type { UpdateGuardianReq } from '@base-monorepo-v2/contracts/schemas/guardian/update-guardian.req';
import {
  GuardianLinkStatus,
  ProfileRole,
  UserRole,
  type Prisma,
} from '@base-monorepo-v2/db/prisma';
import { GuardianshipMapper } from '../guardianship/guardianship.mapper';
import { GuardianMapper } from './guardian.mapper';

class GuardianService {
  listAll = async (query: GuardianQueryParamsTypes['Query']) => {
    const skip = (query.page - 1) * query.size;
    const take = query.size;

    const where: Prisma.GuardianWhereInput = {};

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

    const orderBy: Prisma.GuardianOrderByWithRelationInput = {};

    if (query.sortBy === 'createdAt') {
      orderBy[query.sortBy] = query.order;
    }

    const [content, totalElements] = await Promise.all([
      prisma.guardian.findMany({
        skip,
        take,
        where,
        orderBy,
        include: {
          profile: { include: { user: true, avatar: true } },
          guardianships: {
            include: {
              patient: {
                include: {
                  profile: { include: { user: true, avatar: true } },
                },
              },
            },
          },
        },
      }),
      prisma.guardian.count({ where }),
    ]);

    const data = content.map(GuardianMapper.toMinimalWithPatientsRes);

    const pageResponse = PageMapper.toPageRes({
      query,
      totalElements,
      data,
    });

    return pageResponse;
  };

  getById = async (id: string) => {
    const guardian = await prisma.guardian.findUnique({
      where: { id },
      include: {
        profile: {
          include: {
            user: true,
            avatar: true,
          },
        },
        guardianships: {
          include: {
            patient: {
              include: {
                profile: {
                  include: {
                    user: true,
                    avatar: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!guardian) {
      throw new NotFoundException(`Guardian with id ${id} not found`);
    }

    return GuardianMapper.toRes(guardian);
  };

  create = async (profileId: string) => {
    const profile = await prisma.profile.findUnique({
      where: { id: profileId },
      include: { guardian: true, user: { select: { role: true } } },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found for this user', {
        code: ERROR_CODES.PROFILE.NOT_FOUND,
      });
    }

    if (profile.user.role !== UserRole.USER) {
      throw new ForbiddenException('User has administrative role and cannot be a guardian');
    }

    if (profile.role === ProfileRole.GUARDIAN) {
      throw new ConflictException('Guardian role already exists for this user', {
        code: ERROR_CODES.GUARDIAN.ALREADY_EXISTS,
      });
    }

    if (profile.role) {
      throw new ConflictException('Guardian role already exists for this user', {
        code: ERROR_CODES.GUARDIAN.ALREADY_EXISTS,
      });
    }

    const createGuardianQuery = prisma.guardian.create({
      data: {
        id: profileId,
      },
    });

    const updateProfileRoleQuery = prisma.profile.update({
      where: { id: profileId },
      data: {
        role: ProfileRole.GUARDIAN,
      },
    });

    await Promise.all([createGuardianQuery, updateProfileRoleQuery]);

    return this.getById(profileId);
  };

  update = async (id: string, data: UpdateGuardianReq) => {
    const existing = await prisma.guardian.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Guardian with id ${id} not found`);
    }

    const hashedPassword = await passwordService.hashPassword(data.user.password);

    await prisma.$transaction([
      prisma.user.update({
        where: { id },
        data: {
          username: data.user.username,
          password: hashedPassword,
        },
      }),
      prisma.profile.update({
        where: { id },
        data: {
          firstName: data.profile.firstName,
          lastName: data.profile.lastName,
          gender: data.profile.gender,
          phone: data.profile.phone,
          birthday: data.profile.birthday,
        },
      }),
      prisma.guardian.update({
        where: { id },
        data: {},
      }),
    ]);

    return this.getById(id);
  };

  linkPatient = async (guardianId: string, data: LinkPatientGuardianReq) => {
    const guardianQuery = prisma.guardian.findUnique({ where: { id: guardianId } });
    const patientQuery = prisma.user.findUnique({
      where: { email: data.email },
      include: {
        profile: {
          include: {
            patient: {
              include: {
                guardianships: { where: { guardianId } },
              },
            },
          },
        },
      },
    });
    const [guardian, patientUser] = await Promise.all([guardianQuery, patientQuery]);

    if (!guardian) {
      throw new NotFoundException(`Guardian with id ${guardianId} not found`, {
        code: ERROR_CODES.GUARDIAN.NOT_FOUND,
      });
    }

    const patient = patientUser?.profile?.patient;

    if (!patient) {
      throw new NotFoundException(`No patient found with email ${data.email}`, {
        code: ERROR_CODES.PATIENT.NOT_FOUND,
      });
    }

    if (patient.guardianships.length > 0) {
      throw new ConflictException(
        'A guardianship between this guardian and patient already exists',
        {
          code: ERROR_CODES.GUARDIANSHIP.ALREADY_EXISTS,
        },
      );
    }

    try {
      const guardianship = await prisma.guardianship.create({
        data: {
          guardianId,
          patientId: patient.id,
          linkStatus: GuardianLinkStatus.PENDING,
        },
      });
      return GuardianshipMapper.toRes(guardianship);
    } catch (error) {
      if (isUniqueViolationOn(error, ['guardianId', 'patientId'])) {
        throw new ConflictException(
          'A guardianship between this guardian and patient already exists',
          {
            code: ERROR_CODES.GUARDIANSHIP.ALREADY_EXISTS,
          },
        );
      }
      throw error;
    }
  };
}

export const guardianService = new GuardianService();
