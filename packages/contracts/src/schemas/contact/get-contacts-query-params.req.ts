import { z } from 'zod';
import { baseQueryParamsSchema } from '../../request-parameters/query-params.base-schema';
import type { ContactRes } from './contact.res';

type TableRowType = ContactRes;
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

export const contactQueryParams = {
  schema,
  defaultQuery,
  sortableFields,
  filterableFields,
};

export type ContactQueryParamsTypes = {
  TableRow: TableRowType;
  TableKeys: TableRowKeys;
  Query: QueryType;
  SortableFields: (typeof contactQueryParams.sortableFields)[number];
  FilterableFields: (typeof contactQueryParams.filterableFields)[number];
};
