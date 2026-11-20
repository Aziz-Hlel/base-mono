import { z } from 'zod';
import { baseQueryParamsSchema } from '../../request-parameters/query-params.base-schema';
import type { PatientMinimalRes } from './patient-minimal.res';

type TableRowType = PatientMinimalRes;
type TableRowKeys = keyof TableRowType;

const sortableFields = ['createdAt', 'updatedAt'] as const;
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

export const patientQueryParams = {
  schema,
  defaultQuery,
  sortableFields,
  filterableFields,
};

export type PatientQueryParamsTypes = {
  TableRow: TableRowType;
  TableKeys: TableRowKeys;
  Query: QueryType;
  SortableFields: (typeof patientQueryParams.sortableFields)[number];
  FilterableFields: (typeof patientQueryParams.filterableFields)[number];
};
