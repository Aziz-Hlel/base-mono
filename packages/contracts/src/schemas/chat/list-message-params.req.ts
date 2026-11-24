import { z } from 'zod';
import { chatroomBaseSchema } from '../../base/chatroom.base-schema';

// /chatrooms/:chatroomId/messages
export const listMessageParamsSchema = z
  .object({
    chatroomId: chatroomBaseSchema.id,
  })
  .meta({
    id: 'ListMessageParams',
  });

export type ListMessageParams = z.infer<typeof listMessageParamsSchema>;
