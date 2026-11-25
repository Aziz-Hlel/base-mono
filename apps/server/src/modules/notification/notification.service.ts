import prisma from '@/db';
import { NotFoundException } from '@/exceptions';
import { ERROR_CODES } from '@base-monorepo-v2/contracts/exceptions/codes';
import type { MessageRes } from '@base-monorepo-v2/contracts/schemas/chat/message.res';
import type { ChatNotificationParams } from '@base-monorepo-v2/contracts/schemas/notification/chat-notifcation.res';
import { NotificationKind } from '@base-monorepo-v2/db/prisma';

const PREVIEW_MAX_LENGTH = 80;

class NotificationService {
  createChatNotification = async (recipientIds: string[], message: MessageRes) => {
    if (recipientIds.length === 0) return;

    const sender = await prisma.profile.findUnique({
      where: { id: message.senderId },
      select: { firstName: true, lastName: true, role: true },
    });

    if (!sender) {
      throw new NotFoundException(`Profile with id ${message.senderId} not found`, {
        code: ERROR_CODES.PROFILE.NOT_FOUND,
      });
    }

    const params: ChatNotificationParams = {
      senderName: `${sender.firstName} ${sender.lastName}`,
      senderRole: sender.role,
      chatId: message.chatroomId,
      preview: message.content.slice(0, PREVIEW_MAX_LENGTH),
    };

    await prisma.notification.createMany({
      data: recipientIds.map((profileId) => ({
        profileId,
        kind: NotificationKind.CHAT,
        title: 'notifications.chat.newMessage.title',
        content: 'notifications.chat.newMessage.body',
        params,
      })),
    });
  };
}

export const notificationService = new NotificationService();
