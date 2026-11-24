import z from 'zod';
import { zodString } from './shared/string.zod';

export const messageBaseSchema = {
  id: z.uuid(),
  content: zodString('Message', { min: 1, max: 5000 }),
  senderId: z.uuid(),
  chatroomId: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
};
