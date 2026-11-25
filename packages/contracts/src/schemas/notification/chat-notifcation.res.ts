import { z } from 'zod';
import profileRoleSchema from '../../base/enums/profile-role.schema';
import { messageBaseSchema } from '../../base/message.base-schema';

export const chatNotificationParamsSchema = z
  .object({
    senderName: z.string().min(1),
    senderRole: profileRoleSchema.nullable(),
    chatId: messageBaseSchema.chatroomId,
    preview: z.string().max(80),
  })
  .meta({
    id: 'ChatNotificationParams',
    description: 'Params stored in Notification.params for kind "chat.new_message"',
  });

export type ChatNotificationParams = z.infer<typeof chatNotificationParamsSchema>;
