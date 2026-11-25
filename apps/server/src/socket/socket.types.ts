import type { AccessTokenPayload } from '@base-monorepo-v2/contracts/schemas/auth/accessTokenPaylod';
import type { MessageRes } from '@base-monorepo-v2/contracts/schemas/chat/message.res';
import type { Server, Socket } from 'socket.io';

export type Ack<T> = (res: { ok: true; data: T } | { ok: false; error: string }) => void;

// server -> client
export interface ServerToClientEvents {
  // emitted after a message sent over REST is saved
  'chat:message:new': (message: MessageRes) => void;
}

// client -> server (none yet, messages are sent over REST)
export interface ClientToServerEvents {}

export interface SocketData {
  user: Pick<AccessTokenPayload, 'id' | 'role'>;
}

export type AppServer = Server<ClientToServerEvents, ServerToClientEvents, {}, SocketData>;
export type AppSocket = Socket<ClientToServerEvents, ServerToClientEvents, {}, SocketData>;

export const userRoom = (userId: string) => `user:${userId}`;

// every admin socket joins this room, so support messages reach all admins
export const ADMINS_ROOM = 'admins';
