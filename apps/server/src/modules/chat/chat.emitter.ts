import { socketProvider } from '@/socket';
import { ADMINS_ROOM, userRoom } from '@/socket/socket.types';
import type { MessageRes } from '@base-monorepo-v2/contracts/schemas/chat/message.res';
import { ChatroomType } from '@base-monorepo-v2/db/prisma';

class ChatEmitter {
  messageCreated = (message: MessageRes, memberIds: string[], type: ChatroomType) => {
    const rooms = [...new Set([...memberIds, message.senderId])].map(userRoom);
    // Any admin can answer a support room, so all of them get its messages
    if (type === ChatroomType.SUPPORT) rooms.push(ADMINS_ROOM);
    socketProvider.getIO().to(rooms).emit('chat:message:new', message);
  };
}
export const chatEmitter = new ChatEmitter();
