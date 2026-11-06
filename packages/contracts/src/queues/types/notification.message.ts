import type { DevicePreferredLanguage } from '@base-monorepo-v2/db/prisma';

type NotificationTopicMessage = {
  type: 'topic';
  topic: string;
};

type NotificationDirectMessage = {
  type: 'direct';
  userIds: string[];
};

type NotificationMessageBase = {
  title: Record<DevicePreferredLanguage, string>;
  body: Record<DevicePreferredLanguage, string>;
  data?: Record<string, any>;
};

export type NotificationMessage = NotificationMessageBase &
  (NotificationTopicMessage | NotificationDirectMessage);
