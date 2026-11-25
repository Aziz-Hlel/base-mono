import prisma from '@/db';
import { isUniqueViolationOn } from '@/db/errors/helper';
import { BadRequestException, ForbiddenException, NotFoundException } from '@/exceptions';
import { CursorMapper } from '@/mapper/cursor.mapper';
import { ERROR_CODES } from '@base-monorepo-v2/contracts/exceptions/codes';
import type { SendMessageReq } from '@base-monorepo-v2/contracts/schemas/chat/send-message.req';
import type { CursorQueryParams } from '@base-monorepo-v2/contracts/types/Cursor';
import allAdminRoles from '@base-monorepo-v2/contracts/utils/roles/all-admin-roles';
import {
  ChatroomType,
  GuardianLinkStatus,
  ProfileRole,
  type Prisma,
  type UserRole,
} from '@base-monorepo-v2/db/prisma';
import { notificationService } from '../notification/notification.service';
import { chatEmitter } from './chat.emitter';
import { ChatMapper } from './chat.mapper';
import { toDirectKey } from './chat.utils';

type ChatParticipant = {
  id: string;
  userRole: UserRole;
  profileRole: ProfileRole | null;
};

const isAdminRole = (role: UserRole) => allAdminRoles.some((adminRole) => adminRole === role);

class ChatService {
  sendDirectMessage = async (
    sender: { id: string; role: UserRole },
    targetProfileId: string,
    data: SendMessageReq,
  ) => {
    if (sender.id === targetProfileId) {
      throw new BadRequestException('You cannot send a message to yourself', {
        code: ERROR_CODES.CHATROOM.SELF_CHAT,
      });
    }

    const [senderParticipant, targetParticipant] = await Promise.all([
      this.getParticipant(sender.id),
      this.getParticipant(targetProfileId),
    ]);

    const type = await this.resolveDirectChatroomType(senderParticipant, targetParticipant);

    const chatroomId = await this.findOrCreateDirectChatroom(type, sender.id, targetProfileId);

    return this.createMessage(chatroomId, sender.id, data.content);
  };

  // Access to the room is checked by the canAccessChatroom middleware
  sendMessage = async (chatroomId: string, senderId: string, data: SendMessageReq) => {
    return this.createMessage(chatroomId, senderId, data.content);
  };

  listMessagesByCursor = async (chatroomId: string, query: CursorQueryParams) => {
    const where: Prisma.MessageWhereInput = {
      chatroomId,
    };

    const queryResponse = await prisma.message.findMany({
      where,
      cursor: query.cursor ? { id: query.cursor } : undefined,
      // id breaks ties between messages sent in the same millisecond
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
      take: query.limit + 1,
    });

    const lastItem = queryResponse[query.limit];

    const nextCursor = lastItem?.id ?? null;

    const data = queryResponse.slice(0, query.limit).map(ChatMapper.toMessageRes);

    return CursorMapper.toCursor({
      data,
      nextCursor,
      limit: query.limit,
    });
  };

  private createMessage = async (chatroomId: string, senderId: string, content: string) => {
    const { message, chatroom } = await prisma.$transaction(async (tx) => {
      const createdMessage = await tx.message.create({
        data: { chatroomId, senderId, content },
      });

      const updatedChatroom = await tx.chatroom.update({
        where: { id: chatroomId },
        data: { lastMessageId: createdMessage.id, lastMessageAt: createdMessage.createdAt },
        select: { type: true, members: { select: { profileId: true } } },
      });

      return { message: createdMessage, chatroom: updatedChatroom };
    });

    const messageRes = ChatMapper.toMessageRes(message);

    const memberIds = chatroom.members.map((member) => member.profileId);
    chatEmitter.messageCreated(messageRes, memberIds, chatroom.type);

    const memberIdsWithoutSender = memberIds.filter((id) => id !== senderId);
    notificationService.createChatNotification(memberIdsWithoutSender, messageRes);

    return messageRes;
  };

  private getParticipant = async (profileId: string): Promise<ChatParticipant> => {
    const profile = await prisma.profile.findUnique({
      where: { id: profileId },
      select: { id: true, role: true, user: { select: { role: true } } },
    });

    if (!profile) {
      throw new NotFoundException(`Profile with id ${profileId} not found`, {
        code: ERROR_CODES.PROFILE.NOT_FOUND,
      });
    }

    return { id: profile.id, userRole: profile.user.role, profileRole: profile.role };
  };

  // Who can chat with whom:
  // - an admin with anyone            -> ADMIN
  // - a doctor with a patient         -> MEDICAL
  // - a guardian with their patient   -> GUARDIANSHIP (accepted guardianship only)
  private resolveDirectChatroomType = async (
    a: ChatParticipant,
    b: ChatParticipant,
  ): Promise<ChatroomType> => {
    if (isAdminRole(a.userRole) || isAdminRole(b.userRole)) return ChatroomType.ADMIN;

    const pairHas = (roleX: ProfileRole, roleY: ProfileRole) =>
      (a.profileRole === roleX && b.profileRole === roleY) ||
      (a.profileRole === roleY && b.profileRole === roleX);

    if (pairHas(ProfileRole.DOCTOR, ProfileRole.PATIENT)) return ChatroomType.MEDICAL;

    if (pairHas(ProfileRole.GUARDIAN, ProfileRole.PATIENT)) {
      const [guardian, patient] = a.profileRole === ProfileRole.GUARDIAN ? [a, b] : [b, a];

      const guardianship = await prisma.guardianship.findUnique({
        where: {
          guardianId_patientId: { guardianId: guardian.id, patientId: patient.id },
          linkStatus: GuardianLinkStatus.ACCEPTED,
        },
        select: { id: true },
      });

      if (guardianship) return ChatroomType.GUARDIANSHIP;
    }

    throw new ForbiddenException('You are not allowed to chat with this profile', {
      code: ERROR_CODES.CHATROOM.NOT_ALLOWED,
    });
  };

  private findOrCreateDirectChatroom = async (
    type: ChatroomType,
    profileIdA: string,
    profileIdB: string,
  ) => {
    const directKey = toDirectKey(profileIdA, profileIdB);

    try {
      const chatroom = await prisma.chatroom.upsert({
        where: { directKey },
        create: {
          type,
          directKey,
          members: { create: [{ profileId: profileIdA }, { profileId: profileIdB }] },
        },
        update: {},
        select: { id: true },
      });

      return chatroom.id;
    } catch (error) {
      // Two first messages sent at the same time can both try to create the room.
      // The unique directKey stops the second one, which then uses the existing room.
      if (isUniqueViolationOn(error, ['directKey'])) {
        const chatroom = await prisma.chatroom.findUniqueOrThrow({
          where: { directKey },
          select: { id: true },
        });

        return chatroom.id;
      }
      throw error;
    }
  };
}

export const chatService = new ChatService();
