import z from 'zod';
import { DevicePreferredLanguage } from '../../enums';

const localizedTextSchema = z.record(z.enum(DevicePreferredLanguage), z.string());

const notificationMessageBaseSchema = z.object({
  title: localizedTextSchema,
  body: localizedTextSchema,
  data: z.record(z.string(), z.any()).optional(),
});

const notificationTopicMessageSchema = notificationMessageBaseSchema.extend({
  type: z.literal('topic'),
  topic: z.string(),
});

const notificationDirectMessageSchema = notificationMessageBaseSchema.extend({
  type: z.literal('direct'),
  userIds: z.array(z.uuid()),
});

export const notificationMessageSchema = z.discriminatedUnion('type', [
  notificationTopicMessageSchema,
  notificationDirectMessageSchema,
]);

export type NotificationMessage = z.infer<typeof notificationMessageSchema>;
