import { PreferredPackage } from '@excellense/db/prisma';
import { z } from 'zod';

const preferredPackageSchema = z.enum(PreferredPackage).meta({
  id: 'PreferredPackage',
  description: 'PreferredPackage enum',
});

export default preferredPackageSchema;
