import z from 'zod';

export const presignedUrlReqSchema = z
  .object({
    id: z.uuid(),
    url: z.url(),
    key: z.string(),
  })
  .meta({
    id: 'PresignedUrlRes',
  });

export type PresignedUrlRes = z.infer<typeof presignedUrlReqSchema>;
