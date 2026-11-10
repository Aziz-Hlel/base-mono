import boostrap from './boostrap';
import { DevicesService } from './devices.service';
import { FirebaseProvider } from './firebase';
import { NotificationProvider } from './notification.provider';
import { NotificationService } from './notification.service';
import { NotificationWorker } from './notification.worker';

const execute = async () => {
  await boostrap();
  const firebaseMessaging = new FirebaseProvider();
  await firebaseMessaging.checkConnection();
  const deviceService = new DevicesService();
  const notificationProvider = new NotificationProvider(firebaseMessaging.getMessaging());
  const notificationService = new NotificationService(notificationProvider, deviceService);
  const worker = new NotificationWorker(notificationService);

  process.on('SIGINT', async () => {
    await worker.close();
    process.exit(0);
  });

  process.on('SIGTERM', async () => {
    await worker.close();
    process.exit(0);
  });

  console.log('✅ SUCCESS : Workers are running');
};

execute().catch((error) => {
  console.error('❌ Startup failed', error);
  process.exit(1);
});
