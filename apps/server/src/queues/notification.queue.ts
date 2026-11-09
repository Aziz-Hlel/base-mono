import redis from '@/redis/init';
import QUEUE_NAMES from '@base-monorepo-v2/contracts/queues/names';
import type { NotificationMessage } from '@base-monorepo-v2/contracts/queues/types/notification.message';
import { Queue } from 'bullmq';

type AddNotificationProps = {
  payload: NotificationMessage;
  delay: number;
};

export class NotificationQueue {
  private queue: Queue<NotificationMessage>;
  constructor() {
    this.queue = new Queue<NotificationMessage>(QUEUE_NAMES.notification, {
      connection: redis,
      defaultJobOptions: {
        attempts: 3, // retry up to 3 times
        backoff: { type: 'exponential', delay: 5000 }, // retry with exponential backoff
        removeOnComplete: true, // auto remove successful jobs
        removeOnFail: false, // keep failed jobs for inspection
      },
    });
  }

  add = async ({ payload, delay }: AddNotificationProps) => {
    await this.queue.add(QUEUE_NAMES.notification, payload, {
      delay: delay,
    });
  };
}

export const globalNotificationQueue = new NotificationQueue();
