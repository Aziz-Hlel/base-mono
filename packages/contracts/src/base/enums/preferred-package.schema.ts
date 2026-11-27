import { PreferredPackage } from '@excellense/db/prisma/enums';
import { z } from 'zod';

const preferredPackageSchema = z.enum(PreferredPackage).meta({
  id: 'PreferredPackage',
  description: 'PreferredPackage enum',
});

export default preferredPackageSchema;
