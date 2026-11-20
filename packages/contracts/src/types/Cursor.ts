import z from 'zod';

export const cursorQueryParamsSchema = z
  .object({
    cursor: z.uuid().optional().catch(undefined),
    limit: z.coerce.number().int().positive().max(100).catch(10),
  })
  .meta({
    id: 'CursorQueryParams',
  });

export type CursorQueryParams = z.infer<typeof cursorQueryParamsSchema>;

export type Cursor<T> = {
  data: T[];
  pagination: { nextCursor: string | null; hasNext: boolean; limit: number };
};
