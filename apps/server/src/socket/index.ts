import ENV from '@/env';
import allAdminRoles from '@base-monorepo-v2/contracts/utils/roles/all-admin-roles';
import { hasEnvProdFields } from '@base-monorepo-v2/env/server';
import type { Server as HttpServer } from 'node:http';
import { Server } from 'socket.io';
import { socketAuth } from './socket.auth';
import { ADMINS_ROOM, userRoom, type AppServer } from './socket.types';

class SocketProvider {
  private io: AppServer | null = null;

  createSocketServer = (httpServer: HttpServer) => {
    this.io = new Server(httpServer, {
      path: '/socket.io',
      cors: {
        origin: hasEnvProdFields(ENV) ? ENV.ALLOWED_ORIGIN_PATTERNS : '*',
        credentials: true,
      },
    });

    this.io.use(socketAuth);

    this.io.on('connection', (socket) => {
      // every user gets a private room, so we can reach all their devices
      socket.join(userRoom(socket.data.user.id));

      if (allAdminRoles.some((role) => role === socket.data.user.role)) {
        socket.join(ADMINS_ROOM);
      }
    });
  };

  getIO = () => {
    if (!this.io) throw new Error('Socket server not initialized');
    return this.io;
  };
}

export const socketProvider = new SocketProvider();
