import { MediaType } from '@base-monorepo-v2/db/prisma';
import z from 'zod';

const mediaTypeSchema = z.enum(MediaType).meta({
  id: 'MediaType',
});

export default mediaTypeSchema;
