import { MediaType } from '@base-monorepo-v2/db/prisma';

export const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/heic',
  'image/gif',
  'image/webp',
  'video/mp4',
  'video/quicktime',
  'application/pdf',
] as const;

export type IMimeType = (typeof ALLOWED_MIME_TYPES)[number];

export const mimeTypeToMediaType: Record<IMimeType, MediaType> = {
  ['image/jpeg']: MediaType.IMAGE,
  ['image/png']: MediaType.IMAGE,
  ['image/heic']: MediaType.IMAGE,
  ['image/gif']: MediaType.IMAGE,
  ['image/webp']: MediaType.IMAGE,
  ['video/mp4']: MediaType.VIDEO,
  ['video/quicktime']: MediaType.VIDEO,
  ['application/pdf']: MediaType.DOCUMENT,
};
