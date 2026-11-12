import { GuardianRelationship } from '@base-monorepo-v2/db/prisma';
import { z } from 'zod';

const guardianRelationshipSchema = z.enum(GuardianRelationship).meta({
  id: 'GuardianRelationship',
  description: 'GuardianRelationship enum',
});

export default guardianRelationshipSchema;
