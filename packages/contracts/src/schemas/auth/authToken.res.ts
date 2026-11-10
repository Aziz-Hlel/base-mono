import { z } from 'zod';

export const authTokenResSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  refreshCookieMaxAge: z.number(),
});

export type AuthTokenRes = z.infer<typeof authTokenResSchema>;
