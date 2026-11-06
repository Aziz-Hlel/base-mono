import QUEUE_NAMES from '@base-monorepo-v2/contracts/queues/names';
import { type NotificationMessage } from '@base-monorepo-v2/contracts/queues/types/notification.message';
import { Job, Worker } from 'bullmq';
import { notificationService } from './notification.service';
import redis from './redis';

export class NotificationWorker {
  private worker: Worker<NotificationMessage, void, string>;

  handleJob = async (job: Job<NotificationMessage>) => {
    const data = job.data;
    await notificationService.pushNotification(data);
  };

  constructor() {
    this.worker = new Worker(QUEUE_NAMES.notification, this.handleJob, {
      connection: redis,
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

  getWorker = (): Worker<NotificationMessage, void, string> => {
    return this.worker;
  };

  close = async () => {
    await this.worker.close();
  };
}
