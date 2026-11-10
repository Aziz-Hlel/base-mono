import { z } from 'zod';

export const OauthProvidersEnum = z.enum(['google', 'apple']);

export type OauthProvidersEnum = z.infer<typeof OauthProvidersEnum>;
