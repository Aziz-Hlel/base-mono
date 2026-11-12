import { ProfileRole } from '@base-monorepo-v2/db/prisma';
import { z } from 'zod';

const profileRoleSchema = z.enum(ProfileRole).meta({
  id: 'ProfileRole',
  description: 'ProfileRole enum',
});

export default profileRoleSchema;
