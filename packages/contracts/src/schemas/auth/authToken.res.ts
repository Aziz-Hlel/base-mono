import { z } from 'zod';

export const authTokenResSchema = z
  .object({
    accessToken: z.string(),
    refreshToken: z.string(),
    refreshCookieMaxAge: z.number(),
  })
  .meta({
    id: 'AuthTokenRes',
    description: 'Auth token response schema',
  });

export type AuthTokenRes = z.infer<typeof authTokenResSchema>;
