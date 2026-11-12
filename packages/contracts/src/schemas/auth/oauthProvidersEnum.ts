import { z } from 'zod';

export const OauthProvidersEnum = z.enum(['google', 'apple']).meta({
  id: 'OauthProvidersEnum',
  description: 'Oauth providers enum',
});

export type OauthProvidersEnum = z.infer<typeof OauthProvidersEnum>;
