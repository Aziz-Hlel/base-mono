import QUEUE_NAMES from '@base-monorepo-v2/contracts/queues/names';
import {
  type NotificationMessage,
  notificationMessageSchema,
} from '@base-monorepo-v2/contracts/queues/types/notification.message';
import { Job, UnrecoverableError, Worker } from 'bullmq';
import type { NotificationService } from './notification.service';
import redis from './redis';

export class NotificationWorker {
  private worker: Worker<NotificationMessage, void, string>;
  private notificationService: NotificationService;

  handleJob = async (job: Job<NotificationMessage>) => {
    const parsed = notificationMessageSchema.safeParse(job.data);

    if (!parsed.success) {
      // A malformed message can never succeed, so fail now instead of using up the retries.
      throw new UnrecoverableError(`Invalid notification message: ${parsed.error.message}`);
    }

    await this.notificationService.pushNotification(parsed.data);
  };

  constructor(notificationService: NotificationService) {
    this.notificationService = notificationService;

    this.worker = new Worker(QUEUE_NAMES.notification, this.handleJob, {
      connection: redis,
      concurrency: 2,
    });

    this.worker.on('active', (job) => {
      console.log(`✅ Starting job with id: ${job.id}`);
      console.log('-----');
      console.log('\n');
    });

    this.worker.on('completed', (job) => {
      console.log(`✅ Job id: ${job.id} completed`);
      console.log('-----');
      console.log('\n');
    });

    this.worker.on('failed', (job, err) => {
      console.error(`❌ Job id: ${job?.id} failed`, err);
    });
  }

  close = async () => {
    await this.worker.close();
  };
}
