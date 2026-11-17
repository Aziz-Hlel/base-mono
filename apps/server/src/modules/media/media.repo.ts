import prisma from '@/db';
import type { PresignedUrlReq } from '@base-monorepo-v2/contracts/schemas/media/presigned-url.req';
import { mimeTypeToMediaType } from '@base-monorepo-v2/contracts/schemas/media/utils/mimeTypes';
import { MediaStatus } from '@base-monorepo-v2/db/prisma';

class MediaRepo {
  async createPendingMedia(preSignedUrlDto: PresignedUrlReq, mediaKey: string) {
    const type = mimeTypeToMediaType[preSignedUrlDto.mimeType];
    const createdMedia = await prisma.media.create({
      data: {
        baseName: preSignedUrlDto.name,
        type,
        key: mediaKey,
        mimeType: preSignedUrlDto.mimeType,
        fileSize: preSignedUrlDto.fileSize,
        status: MediaStatus.PENDING,
        blurHash: preSignedUrlDto.blurhash,
      },
    });

    return createdMedia;
  }

  async findMediaById(props: { mediaId: string; tx?: any }) {
    const orm = props.tx ?? prisma;
    const media = await orm.media.findUnique({
      where: {
        id: props.mediaId,
      },
    });

    return media;
  }

  async findMediaByKey(mediaKey: string) {
    const media = await prisma.media.findUnique({
      where: {
        key: mediaKey,
      },
    });

    return media;
  }

  async confirmMediaUploadByKey(mediaKey: string) {
    await prisma.media.update({
      where: {
        key: mediaKey,
      },
      data: {
        status: MediaStatus.CONFIRMED,
      },
    });
  }

  async confirmMediaUploadById(mediaId: string) {
    await prisma.media.update({
      where: {
        id: mediaId,
      },
      data: {
        status: MediaStatus.CONFIRMED,
      },
    });
  }
}

export const mediaRepo = new MediaRepo();
