import z from 'zod';

/**
 * Body for /auth/refresh and /auth/logout sent by mobile clients (`X-Client: mobile`).
 * Web clients send the refresh token in the httpOnly cookie instead.
 */
export const refreshTokenBodySchema = z
  .object({
    refreshToken: z.string().min(1),
  })
  .meta({ id: 'RefreshTokenInput' });

export type RefreshTokenInput = z.infer<typeof refreshTokenBodySchema>;
