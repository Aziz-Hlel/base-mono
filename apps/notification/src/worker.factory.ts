import { NotificationWorker } from './notification.worker';

export class NotificationFactory {
  private static workers: NotificationWorker[] = [];
  private static numberOfWorkers = 2;

  constructor() {
    Array.from({ length: NotificationFactory.numberOfWorkers }).forEach(() => {
      const newWorker = new NotificationWorker();
      NotificationFactory.workers.push(newWorker);
    });
  }

  closeAll = async () => {
    const closeAsync = NotificationFactory.workers.map(async (woker) => woker.close());
    await Promise.resolve(closeAsync);
  };
}
