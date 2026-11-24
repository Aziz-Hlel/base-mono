import z from 'zod';

export const chatroomMemberBaseSchema = {
  chatroomId: z.uuid(),
  profileId: z.uuid(),
  lastReadAt: z.iso.datetime().nullable(),
  joinedAt: z.iso.datetime(),
};
