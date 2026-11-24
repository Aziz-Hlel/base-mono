import { ChatroomType } from '@base-monorepo-v2/db/prisma';
import z from 'zod';

const chatroomTypeSchema = z.enum(ChatroomType).meta({
  id: 'ChatroomType',
});

export default chatroomTypeSchema;
