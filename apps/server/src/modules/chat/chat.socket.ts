import { userRoom, type AppServer, type AppSocket } from '@/socket/socket.types';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';

const sendSchema = z.object({
  toUserId: z.uuid(),
  text: z.string().trim().min(1).max(2000),
});

export function registerChatHandlers(io: AppServer, socket: AppSocket) {
  socket.on('chat:send', (payload, ack) => {
    const parsed = sendSchema.safeParse(payload);
    if (!parsed.success) return ack?.({ ok: false, error: 'Invalid message' });

    // TODO: check the sender is allowed to message toUserId, then save the message in the DB
    const message = {
      id: randomUUID(),
      fromUserId: socket.data.user.id,
      toUserId: parsed.data.toUserId,
      text: parsed.data.text,
      sentAt: new Date().toISOString(),
    };

    // deliver to the receiver + the sender's other devices
    io.to(userRoom(message.toUserId))
      .to(userRoom(message.fromUserId))
      .emit('chat:message', message);

    ack?.({ ok: true, data: message });
  });
}
