import prisma from '@/db';
import { ConflictException, NotFoundException } from '@/exceptions';
import { ERROR_CODES } from '@base-monorepo-v2/contracts/exceptions/codes';
import type { CreateGuardianshipReq } from '@base-monorepo-v2/contracts/schemas/guardianship/create-guardianship.req';
import type { UpdateGuardianshipStatusReq } from '@base-monorepo-v2/contracts/schemas/guardianship/update-guardianship-status.req';
import type { UpdateGuardianshipReq } from '@base-monorepo-v2/contracts/schemas/guardianship/update-guardianship.req';
import { GuardianLinkStatus } from '@base-monorepo-v2/db/prisma';
import { GuardianshipMapper } from './guardianship.mapper';

class GuardianshipService {
  create = async (guardianId: string, data: CreateGuardianshipReq) => {
    const patientUser = await prisma.user.findUnique({
      where: { email: data.email },
      include: { profile: { include: { patient: true } } },
    });

    const patient = patientUser?.profile?.patient;

    if (!patient) {
      throw new NotFoundException(`No patient found with email ${data.email}`, {
        code: ERROR_CODES.PATIENT.NOT_FOUND,
      });
    }

    const guardian = await prisma.guardian.findUnique({
      where: { id: guardianId },
      include: {
        guardianships: {
          where: {
            patientId: patient.id,
          },
        },
      },
    });

    if (!guardian) {
      throw new NotFoundException('Guardian not found for this user', {
        code: ERROR_CODES.GUARDIAN.NOT_FOUND,
      });
    }

    const existing = guardian.guardianships[0];

    if (existing && existing.linkStatus === GuardianLinkStatus.ACCEPTED) {
      throw new ConflictException('Guardian is already linked with this patient', {
        code: ERROR_CODES.GUARDIANSHIP.ALREADY_LINKED,
      });
    }

    if (existing && existing.linkStatus === GuardianLinkStatus.PENDING) {
      throw new ConflictException('A link request with this patient already exists', {
        code: ERROR_CODES.GUARDIANSHIP.PENDING_ALREADY_EXISTS,
      });
    }

    if (existing && existing.linkStatus === GuardianLinkStatus.REVOKED) {
      const guardianship = await prisma.guardianship.update({
        where: { id: existing.id },
        data: {
          linkStatus: GuardianLinkStatus.PENDING,
        },
      });

      return GuardianshipMapper.toRes(guardianship);
    }

    const guardianship = await prisma.guardianship.create({
      data: {
        guardianId,
        patientId: patient.id,
        linkStatus: GuardianLinkStatus.PENDING,
      },
    });

    return GuardianshipMapper.toRes(guardianship);
  };

  update = async (id: string, data: UpdateGuardianshipReq) => {
    const existing = await prisma.guardianship.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Guardianship with id ${id} not found`, {
        code: ERROR_CODES.GUARDIANSHIP.NOT_FOUND,
      });
    }

    const updated = await prisma.guardianship.update({
      where: { id },
      data: {
        relationship: data.relationship,
        canViewMedicalInfo: data.canViewMedicalInfo,
        canManageAppointments: data.canManageAppointments,
        canManageMedications: data.canManageMedications,
        receivesNotifications: data.receivesNotifications,
      },
    });

    return GuardianshipMapper.toRes(updated);
  };

  updateStatus = async (
    patientId: string,
    guardianId: string,
    data: UpdateGuardianshipStatusReq,
  ) => {
    const existing = await prisma.guardianship.findUnique({
      where: {
        guardianId_patientId: {
          guardianId,
          patientId,
        },
      },
    });

    if (!existing) {
      throw new NotFoundException(
        `Guardianship for guardian ${guardianId} and patient ${patientId} not found`,
        { code: ERROR_CODES.GUARDIANSHIP.NOT_FOUND },
      );
    }

    const updated = await prisma.guardianship.update({
      where: { id: existing.id },
      data: {
        linkStatus: data.linkStatus,
      },
    });

    return GuardianshipMapper.toRes(updated);
  };
}

export const guardianshipService = new GuardianshipService();
