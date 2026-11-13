import z from 'zod';

export const guardianBaseSchema = {
  id: z.uuid(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
};
