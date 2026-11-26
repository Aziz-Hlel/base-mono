import z from 'zod';

export const baseQueryParamsSchema = z.object({
  page: z.unknown().transform((val) => {
    const parsed = z.coerce.number().int().positive().safeParse(val);
    return parsed.success ? parsed.data : 1;
  }),
  size: z.coerce.number().int().min(5).max(50).catch(10),
  order: z.enum(['asc', 'desc']).catch('desc'),
  search: z.string().trim().nonempty().optional().catch(undefined),
});

export type BaseQueryParams = z.infer<typeof baseQueryParamsSchema>;

export const csvEnumArray = <T extends readonly string[]>(values: T) =>
  z
    .string()
    .transform((value) =>
      value
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean)
        .sort(),
    )
    .pipe(z.array(z.enum(values)));
