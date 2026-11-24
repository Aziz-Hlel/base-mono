import type { MessageRes } from '@base-monorepo-v2/contracts/schemas/chat/message.res';
import type { Message } from '@base-monorepo-v2/db/prisma';

export class ChatMapper {
  static toMessageRes = (message: Message): MessageRes => ({
    id: message.id,
    chatroomId: message.chatroomId,
    senderId: message.senderId,
    content: message.content,
    createdAt: message.createdAt.toISOString(),
    updatedAt: message.updatedAt.toISOString(),
  });
}
