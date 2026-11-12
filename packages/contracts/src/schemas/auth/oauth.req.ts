import { z } from 'zod';
import { OauthProvidersEnum } from './oauthProvidersEnum';

export const oauthReqSchema = z
  .object({
    provider: OauthProvidersEnum,
    token: z.string().trim().min(1, 'Token is required'),
  })
  .meta({
    id: 'OauthReq',
    description: 'Oauth request schema',
  });

export type OauthReq = z.infer<typeof oauthReqSchema>;
