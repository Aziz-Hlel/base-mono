import type { AccessTokenPayload } from '@base-monorepo-v2/contracts/schemas/auth/accessTokenPaylod';
import type { MessageRes } from '@base-monorepo-v2/contracts/schemas/chat/message.res';
import type { Server, Socket } from 'socket.io';

export type ChatMessage = {
  id: string;
  fromUserId: string;
  toUserId: string;
  text: string;
  sentAt: string;
};

export type Ack<T> = (res: { ok: true; data: T } | { ok: false; error: string }) => void;

// server -> client
export interface ServerToClientEvents {
  'chat:message': (message: ChatMessage) => void;
  // emitted after a message sent over REST is saved
  'chat:message:new': (message: MessageRes) => void;
}

// client -> server
export interface ClientToServerEvents {
  'chat:send': (payload: { toUserId: string; text: string }, ack: Ack<ChatMessage>) => void;
}

export interface SocketData {
  user: Pick<AccessTokenPayload, 'id' | 'role'>;
}

export type AppServer = Server<ClientToServerEvents, ServerToClientEvents, {}, SocketData>;
export type AppSocket = Socket<ClientToServerEvents, ServerToClientEvents, {}, SocketData>;

export const userRoom = (userId: string) => `user:${userId}`;
