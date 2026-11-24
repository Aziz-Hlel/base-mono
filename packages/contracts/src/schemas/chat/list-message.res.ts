import { z } from 'zod';
import { messageResSchema } from './message.res';

export const listMessageResSchema = z.array(messageResSchema).meta({
  id: 'ListMessageRes',
  description: 'Cursor page of chatroom messages, newest first',
});

export type ListMessageRes = z.infer<typeof listMessageResSchema>;
