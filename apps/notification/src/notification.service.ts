import type { NotificationMessage } from '@base-monorepo-v2/contracts/queues/types/notification.message';
import type { DevicesService } from './devices.service';
import { NotificationProvider } from './notification.provider';

export class NotificationService {
  private notificationProvider: NotificationProvider;
  private devicesService: DevicesService;
  constructor(notificationProvider: NotificationProvider, devicesService: DevicesService) {
    this.notificationProvider = notificationProvider;
    this.devicesService = devicesService;
  }

  pushNotification = async (data: NotificationMessage) => {
    if (data.type === 'direct') {
      const fids = await this.devicesService.getFidsByUserIds(data.userIds);
      // this.notificationProvider.push({
      //   fids:fids,

      // });
    }
  };
}
