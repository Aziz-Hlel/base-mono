import { Gender } from '@base-monorepo-v2/db/prisma';
import { z } from 'zod';

const genderSchema = z.enum(Gender).meta({
  id: 'Gender',
  description: 'Gender enum',
});

export default genderSchema;
