import { Worker } from 'bullmq';

export interface IWorker<T> {
  close: () => Promise<void>;
  getWorkers: () => Worker<T>[];
}
