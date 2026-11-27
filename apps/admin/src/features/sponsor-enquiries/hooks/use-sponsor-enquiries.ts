import { listSponsorEnquiries, type SponsorEnquiryRes } from '@/api/generated/client';
import { buildListQuery, parsePaginatedResponse, type ListQueryParams } from '@/api/pagination';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useSponsorEnquiries = (params: ListQueryParams) => {
  return useQuery({
    queryKey: ['sponsor-enquiries', params],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const result = await listSponsorEnquiries({
        query: buildListQuery(params) as never,
      });

      return parsePaginatedResponse<SponsorEnquiryRes>(
        result,
        params,
        'Failed to fetch sponsor enquiries',
      );
    },
  });
};
