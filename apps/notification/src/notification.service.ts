import type { NotificationMessage } from '@base-monorepo-v2/contracts/queues/types/notification.message';

export class NotificationService {
  pushNotification = async (data: NotificationMessage) => {};
}

export const notificationService = new NotificationService();
