import { z } from 'zod';
import { baseQueryParamsSchema } from '../../request-parameters/query-params.base-schema';
import type { ExhibitorEnquiryRes } from './exhibitor-enquiry.res';

type TableRowType = ExhibitorEnquiryRes;
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

export const exhibitorEnquiryQueryParams = {
  schema,
  defaultQuery,
  sortableFields,
  filterableFields,
};

export type ExhibitorEnquiryQueryParamsTypes = {
  TableRow: TableRowType;
  TableKeys: TableRowKeys;
  Query: QueryType;
  SortableFields: (typeof exhibitorEnquiryQueryParams.sortableFields)[number];
  FilterableFields: (typeof exhibitorEnquiryQueryParams.filterableFields)[number];
};
