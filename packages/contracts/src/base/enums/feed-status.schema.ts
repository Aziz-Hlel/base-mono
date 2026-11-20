import { FeedStatus } from '@base-monorepo-v2/db/prisma';
import z from 'zod';

const feedStatusSchema = z.enum(FeedStatus).meta({
  id: 'FeedStatus',
});

export default feedStatusSchema;
