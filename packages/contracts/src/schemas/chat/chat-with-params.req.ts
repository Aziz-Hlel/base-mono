import { z } from 'zod';
import { chatroomMemberBaseSchema } from '../../base/chatroom-member.base-schema';

// /chats/with/:profileId
export const chatWithParamsSchema = z
  .object({
    profileId: chatroomMemberBaseSchema.profileId,
  })
  .meta({
    id: 'ChatWithParams',
  });

export type ChatWithParams = z.infer<typeof chatWithParamsSchema>;
