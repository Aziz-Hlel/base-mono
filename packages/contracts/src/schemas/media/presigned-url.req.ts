import z from 'zod';
import { ALLOWED_MIME_TYPES } from './utils/mimeTypes';
import normalizeFilename from './utils/normalizeFilename';

const oneMb = 1024 * 1024;
const maxFileSize = 100 * oneMb;

export const presignedUrlRequestSchema = z.object({
  name: z.string().trim().min(1).max(255).transform(normalizeFilename),
  mimeType: z.enum(ALLOWED_MIME_TYPES),
  fileSize: z.number().positive().max(maxFileSize),
  blurhash: z.string().max(50).nullish(),
});

export type PresignedUrlReq = z.infer<typeof presignedUrlRequestSchema>;
