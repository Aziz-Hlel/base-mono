import ENV from '@/env';
import { registerChatHandlers } from '@/modules/chat/chat.socket';
import { hasEnvProdFields } from '@base-monorepo-v2/env/server';
import type { Server as HttpServer } from 'node:http';
import { Server } from 'socket.io';
import { socketAuth } from './socket.auth';
import { userRoom, type AppServer } from './socket.types';

let io: AppServer | null = null;

export function createSocketServer(httpServer: HttpServer) {
  io = new Server(httpServer, {
    path: '/socket.io',
    cors: {
      origin: hasEnvProdFields(ENV) ? ENV.ALLOWED_ORIGIN_PATTERNS : '*',
      credentials: true,
    },
  });

  io.use(socketAuth);

  io.on('connection', (socket) => {
    // every user gets a private room, so we can reach all their devices
    socket.join(userRoom(socket.data.user.id));

    registerChatHandlers(io!, socket);
  });

  return io;
}

// Use this to emit from REST services (e.g. notify a user after an HTTP action)
export function getIO() {
  if (!io) throw new Error('Socket server not initialized');
  return io;
}
