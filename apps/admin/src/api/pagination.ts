export interface PaginationMeta {
  number: number;
  size: number;
  totalElements: number;
  totalPages: number;
  offset: number;
  pageSize: number;
}

export interface ListQueryParams {
  page: number;
  size: number;
  search?: string;
  sortBy: 'createdAt' | 'updatedAt';
  order: 'asc' | 'desc';
}

const DEFAULT_PAGINATION: PaginationMeta = {
  number: 1,
  size: 10,
  totalElements: 0,
  totalPages: 0,
  offset: 0,
  pageSize: 0,
};

export const buildListQuery = (params: ListQueryParams) => ({
  page: params.page,
  size: params.size,
  sortBy: params.sortBy,
  order: params.order,
  ...(params.search?.trim() ? { search: params.search.trim() } : {}),
});

export const parsePaginatedResponse = <T>(
  result: { data?: unknown; error?: unknown; response?: Response },
  params: ListQueryParams,
  fallbackError: string,
): { items: T[]; pagination: PaginationMeta } => {
  if (!result.response?.ok) {
    const message =
      result.error && typeof result.error === 'object' && 'message' in result.error
        ? String((result.error as { message: unknown }).message)
        : fallbackError;
    throw new Error(message);
  }

  if (Array.isArray(result.data)) {
    const items = result.data as T[];
    return {
      items,
      pagination: {
        ...DEFAULT_PAGINATION,
        totalElements: items.length,
        totalPages: items.length > 0 ? 1 : 0,
        pageSize: items.length,
      },
    };
  }

  const payload = result.data as { data?: T[]; pagination?: PaginationMeta } | undefined;
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
};
