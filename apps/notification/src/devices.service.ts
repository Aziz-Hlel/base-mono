import prisma from './db';

export class DevicesService {
  getFidsByUserIds = async (userIds: string[]) => {
    const fidsQueryResponse = await prisma.device.findMany({
      where: {
        userId: {
          in: userIds,
        },
      },
      select: {
        fid: true,
      },
    });

    const fids = fidsQueryResponse.map((queryRes) => queryRes.fid);
    return fids;
  };

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
