import { MediaStatus } from '@base-monorepo-v2/db/prisma';
import z from 'zod';

const mediaStatusSchema = z.enum(MediaStatus).meta({
  id: 'MediaStatus',
});

export default mediaStatusSchema;
