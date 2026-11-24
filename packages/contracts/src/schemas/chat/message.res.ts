import { z } from 'zod';
import { messageBaseSchema } from '../../base/message.base-schema';

export const messageResSchema = z
  .object({
    id: messageBaseSchema.id,
    chatroomId: messageBaseSchema.chatroomId,
    senderId: messageBaseSchema.senderId,
    content: messageBaseSchema.content,
    createdAt: messageBaseSchema.createdAt,
    updatedAt: messageBaseSchema.updatedAt,
  })
  .meta({
    id: 'MessageRes',
  });

export type MessageRes = z.infer<typeof messageResSchema>;
