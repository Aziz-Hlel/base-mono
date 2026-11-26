import { z } from 'zod';
import { baseQueryParamsSchema } from '../../request-parameters/query-params.base-schema';
import type { SponsorEnquiryRes } from './sponsor-enquiry.res';

type TableRowType = SponsorEnquiryRes;
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

export const sponsorEnquiryQueryParams = {
  schema,
  defaultQuery,
  sortableFields,
  filterableFields,
};

export type SponsorEnquiryQueryParamsTypes = {
  TableRow: TableRowType;
  TableKeys: TableRowKeys;
  Query: QueryType;
  SortableFields: (typeof sponsorEnquiryQueryParams.sortableFields)[number];
  FilterableFields: (typeof sponsorEnquiryQueryParams.filterableFields)[number];
};
