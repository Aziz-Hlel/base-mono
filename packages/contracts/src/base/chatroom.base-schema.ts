import z from 'zod';
import chatroomTypeSchema from './enums/chatroom-type.schema';

export const chatroomBaseSchema = {
  id: z.uuid(),
  type: chatroomTypeSchema,
  directKey: z.string().nullable(),
  lastMessageId: z.uuid().nullable(),
  lastMessageAt: z.iso.datetime().nullable(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
};
