import prisma from './db';

export class DevicesService {
  deleteDevice = async (fids: string[]) => {
    await prisma.device.deleteMany({
      where: {
        fid: {
          in: fids,
        },
      },
    });
  };
}
