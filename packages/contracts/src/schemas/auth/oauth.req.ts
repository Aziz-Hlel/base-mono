import { z } from 'zod';
import { OauthProvidersEnum } from './oauthProvidersEnum';

export const oauthReqSchema = z.object({
  provider: OauthProvidersEnum,
  token: z.string().trim().min(1, 'Token is required'),
});

export type OauthReq = z.infer<typeof oauthReqSchema>;
