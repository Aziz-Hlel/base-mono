import { z } from 'zod';
import { messageBaseSchema } from '../../base/message.base-schema';

export const sendMessageReqSchema = z
  .object({
    content: messageBaseSchema.content,
  })
  .meta({
    id: 'SendMessageReq',
  });

export type SendMessageReq = z.infer<typeof sendMessageReqSchema>;
