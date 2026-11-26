import { PreferredSponsorshipLevel } from '@excellense/db/prisma';
import { z } from 'zod';

const preferredSponsorshipLevelSchema = z.enum(PreferredSponsorshipLevel).meta({
  id: 'PreferredSponsorshipLevel',
  description: 'PreferredSponsorshipLevel enum',
});

export default preferredSponsorshipLevelSchema;
