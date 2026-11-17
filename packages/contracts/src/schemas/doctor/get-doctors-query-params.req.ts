import { z } from 'zod';
import { baseQueryParamsSchema } from '../../base/shared/query-params.base-schema';
import type { DoctorMinimalRes } from './doctor-minimal.res';

type TableRowType = DoctorMinimalRes;
type TableRowKeys = keyof TableRowType;

const sortableFields = ['createdAt', 'updatedAt'] as const;
const filterableFields = [] as const;

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

export const doctorQueryParams = {
  schema,
  defaultQuery,
  sortableFields,
  filterableFields,
};

export type DoctorQueryParamsTypes = {
  TableRow: TableRowType;
  TableKeys: TableRowKeys;
  Query: QueryType;
  SortableFields: (typeof doctorQueryParams.sortableFields)[number];
  FilterableFields: (typeof doctorQueryParams.filterableFields)[number];
};
