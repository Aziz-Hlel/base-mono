import { listContacts, type ContactRes } from '@/api/generated/client';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export interface ContactsPagination {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  offset: number;
  pageSize: number;
}

export interface ContactsQueryParams {
  page: number;
  size: number;
  search?: string;
  sortBy: 'createdAt' | 'updatedAt';
  order: 'asc' | 'desc';
}

interface ContactsApiPayload {
  data: ContactRes[];
  pagination?: ContactsPagination;
}

const DEFAULT_PAGINATION: ContactsPagination = {
  number: 1,
  size: 10,
  totalElements: 0,
  totalPages: 0,
  offset: 0,
  pageSize: 0,
};

export const useContacts = (params: ContactsQueryParams) => {
  return useQuery({
    queryKey: ['contacts', params],
    placeholderData: keepPreviousData,
    queryFn: async (): Promise<{ items: ContactRes[]; pagination: ContactsPagination }> => {
      const { data, error, response } = await listContacts({
        query: {
          page: params.page,
          size: params.size,
          sortBy: params.sortBy,
          order: params.order,
          ...(params.search?.trim() ? { search: params.search.trim() } : {}),
        } as never,
      });

      if (!response?.ok) {
        const message =
          error && typeof error === 'object' && 'message' in error
            ? String((error as { message: unknown }).message)
            : 'Failed to fetch contacts';
        throw new Error(message);
      }

      if (Array.isArray(data)) {
        return {
          items: data,
          pagination: {
            ...DEFAULT_PAGINATION,
            totalElements: data.length,
            totalPages: data.length > 0 ? 1 : 0,
            pageSize: data.length,
          },
        };
      }

      const payload = data as unknown as ContactsApiPayload | undefined;
      const items = Array.isArray(payload?.data) ? payload.data : [];

      return {
        items,
        pagination: payload?.pagination ?? {
          ...DEFAULT_PAGINATION,
          number: params.page,
          size: params.size,
          totalElements: items.length,
          totalPages: items.length > 0 ? 1 : 0,
          pageSize: items.length,
        },
      };
    },
  });
};
