import prisma from '@/db';
import { ConflictException, NotFoundException, NotImplementedException } from '@/exceptions';
import { ERROR_CODES } from '@base-monorepo-v2/contracts/exceptions/codes';
import type { CreateGuardianshipReq } from '@base-monorepo-v2/contracts/schemas/guardianship/create-guardianship.req';
import type { RespondGuardianshipRequestReq } from '@base-monorepo-v2/contracts/schemas/guardianship/respond-guardianship-request.req';
import type { UpdateGuardianshipStatusReq } from '@base-monorepo-v2/contracts/schemas/guardianship/update-guardianship-status.req';
import type { UpdateGuardianshipReq } from '@base-monorepo-v2/contracts/schemas/guardianship/update-guardianship.req';
import { toDirectKey } from '@/modules/chat/chat.utils';
import { ChatroomType, GuardianLinkStatus, type Guardianship } from '@base-monorepo-v2/db/prisma';
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

    if (existing) {
      switch (existing.linkStatus) {
        case GuardianLinkStatus.ACCEPTED: {
          throw new ConflictException('Guardian is already linked with this patient', {
            code: ERROR_CODES.GUARDIANSHIP.ALREADY_LINKED,
          });
        }
        case GuardianLinkStatus.PENDING: {
          throw new ConflictException('A link request with this patient already exists', {
            code: ERROR_CODES.GUARDIANSHIP.PENDING_ALREADY_EXISTS,
          });
        }
        case GuardianLinkStatus.REVOKED: {
          const guardianship = await prisma.guardianship.update({
            where: { id: existing.id },
            data: {
              linkStatus: GuardianLinkStatus.PENDING,
            },
          });

          return GuardianshipMapper.toRes(guardianship);
        }
        default:
          throw new NotImplementedException();
      }
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

  getById = async (id: string) => {
    const guardianship = await prisma.guardianship.findUnique({
      where: { id },
    });

    if (!guardianship) {
      throw new NotFoundException(`Guardianship with id ${id} not found`, {
        code: ERROR_CODES.GUARDIANSHIP.NOT_FOUND,
      });
    }

    return GuardianshipMapper.toRes(guardianship);
  };

  getByPatientIdAndGuardianId = async (patientId: string, guardianId: string) => {
    const guardianship = await prisma.guardianship.findUnique({
      where: {
        guardianId_patientId: { patientId, guardianId },
        linkStatus: GuardianLinkStatus.ACCEPTED,
      },
    });

    if (!guardianship) {
      throw new NotFoundException('Guardianship not found', {
        code: ERROR_CODES.GUARDIANSHIP.NOT_FOUND,
      });
    }

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
        canViewAppointments: data.canViewAppointments,
        canViewMedications: data.canViewMedications,
        canReceiveNotifications: data.canReceiveNotifications,
      },
    });

    return GuardianshipMapper.toRes(updated);
  };

  respondToRequest = async (id: string, data: RespondGuardianshipRequestReq) => {
    const existing = await prisma.guardianship.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Guardianship with id ${id} not found`, {
        code: ERROR_CODES.GUARDIANSHIP.NOT_FOUND,
      });
    }

    if (data.linkStatus === GuardianLinkStatus.REVOKED) return this.revoke(existing);

    const updated = await prisma.guardianship.update({
      where: { id },
      data: {
        linkStatus: data.linkStatus,
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

    if (data.linkStatus === GuardianLinkStatus.REVOKED) return this.revoke(existing);

    const updated = await prisma.guardianship.update({
      where: { id: existing.id },
      data: {
        linkStatus: data.linkStatus,
      },
    });

    return GuardianshipMapper.toRes(updated);
  };

  // Revoking deletes the guardianship and the guardian-patient chatroom
  // (its members and messages are deleted with it by cascade).
  private revoke = async (existing: Guardianship) => {
    await prisma.$transaction([
      prisma.chatroom.deleteMany({
        where: {
          type: ChatroomType.GUARDIANSHIP,
          directKey: toDirectKey(existing.guardianId, existing.patientId),
        },
      }),
      prisma.guardianship.delete({ where: { id: existing.id } }),
    ]);

    return GuardianshipMapper.toRes({ ...existing, linkStatus: GuardianLinkStatus.REVOKED });
  };
}

export const guardianshipService = new GuardianshipService();
