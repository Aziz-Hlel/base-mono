import { storageService } from '@/storage';
import type { MediaResponse } from '@base-monorepo-v2/contracts/schemas/media/media.res';
import type { PresignedUrlReq } from '@base-monorepo-v2/contracts/schemas/media/presigned-url.req';
import type { PresignedUrlRes } from '@base-monorepo-v2/contracts/schemas/media/presigned-url.res';
import type { Media } from '@base-monorepo-v2/db/prisma';
import { mediaRepo } from './media.repo';

class MediaService {
  toMediaRes(media: Media): MediaResponse;
  toMediaRes(media: null): null;
  toMediaRes(media: Media | null): MediaResponse | null;
  toMediaRes(media: Media | null): MediaResponse | null {
    if (!media) return null;
    const url = storageService.getObjectUrl(media.key);
    return {
      id: media.id,
      key: media.key,
      type: media.type,
      blurHash: media.blurHash,
      url,
    };
  }

  async getPresignedUrl(schema: PresignedUrlReq): Promise<PresignedUrlRes> {
    const mediaKey = storageService.generateMediaKey(schema.name);
    const { mimeType } = schema;
    const expiresIn = 3600;

    const createdMedia = await mediaRepo.createPendingMedia(schema, mediaKey);

    const signedUrl = await storageService.generatePresignedUrl({
      mediaKey,
      mimeType,
      expiresIn,
    });

    return {
      id: createdMedia.id,
      url: signedUrl,
      key: mediaKey,
    };
  }
}

export const mediaService = new MediaService();
