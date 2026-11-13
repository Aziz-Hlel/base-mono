import { z } from 'zod';
import { baseQueryParamsSchema } from '../../base/shared/query-params.base-schema';
import type { GuardianMinimalRes } from './guardian-minimal.res';

type TableRowType = GuardianMinimalRes;
type TableRowKeys = keyof TableRowType;

const sortableFields = ['createdAt', 'updatedAt'] as const satisfies TableRowKeys[];
const filterableFields = [] as const satisfies TableRowKeys[];

const schema = z.object({
  ...baseQueryParamsSchema.shape,
  sortBy: z.enum(sortableFields).catch('createdAt'),
});

type QueryType = z.infer<typeof schema>;

const defaultQuery = {
  page: 1,
  size: 10,
  sortBy: 'createdAt',
  order: 'desc',
  search: undefined,
} as const satisfies QueryType;

export const guardianQueryParams = {
  schema,
  defaultQuery,
  sortableFields,
  filterableFields,
};

export type GuardianQueryParamsTypes = {
  TableRow: TableRowType;
  TableKeys: TableRowKeys;
  Query: QueryType;
  SortableFields: (typeof guardianQueryParams.sortableFields)[number];
  FilterableFields: (typeof guardianQueryParams.filterableFields)[number];
};
