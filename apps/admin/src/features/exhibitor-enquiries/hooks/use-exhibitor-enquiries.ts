import { listExhibitorEnquiries, type ExhibitorEnquiryRes } from '@/api/generated/client';
import { buildListQuery, parsePaginatedResponse, type ListQueryParams } from '@/api/pagination';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const useExhibitorEnquiries = (params: ListQueryParams) => {
  return useQuery({
    queryKey: ['exhibitor-enquiries', params],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const result = await listExhibitorEnquiries({
        query: buildListQuery(params) as never,
      });

      return parsePaginatedResponse<ExhibitorEnquiryRes>(
        result,
        params,
        'Failed to fetch exhibitor enquiries',
      );
    },
  });
};
