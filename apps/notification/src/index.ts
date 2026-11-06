import boostrap from './boostrap';
import { NotificationFactory } from './worker.factory';

const execute = async () => {
  await boostrap();
  const workers = new NotificationFactory();

  process.on('SIGINT', async () => {
    await workers.closeAll();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    await workers.closeAll();
    process.exit(0);
  });

  console.log('✅ SUCCESS : Workers are running');
};

execute();
