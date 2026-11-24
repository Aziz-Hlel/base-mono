import { jwtService } from '@/modules/auth/jwt.service';
import type { AppSocket } from './socket.types';

// Client connects with: io(URL, { auth: { token: '<access token>' } })
export const socketAuth = (socket: AppSocket, next: (err?: Error) => void) => {
  const token = socket.handshake.auth?.token;
  if (typeof token !== 'string' || !token) return next(new Error('Authentication required'));

  try {
    const payload = jwtService.verifyAccessToken(token);
    socket.data.user = { id: payload.id, role: payload.role };
    next();
  } catch {
    next(new Error('Invalid access token'));
  }
};
