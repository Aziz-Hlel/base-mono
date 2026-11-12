import { GuardianLinkStatus } from '@base-monorepo-v2/db/prisma';
import { z } from 'zod';

const guardianLinkStatusSchema = z.enum(GuardianLinkStatus).meta({
  id: 'GuardianLinkStatus',
  description: 'GuardianLinkStatus enum',
});

export default guardianLinkStatusSchema;
