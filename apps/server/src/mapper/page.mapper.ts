import type { BaseQueryParams } from '@base-monorepo-v2/contracts/base/shared/query-params.base-schema';
import type { PageRes } from '@base-monorepo-v2/contracts/types/Page';

export class PageMapper {
  static toPageRes<T>(params: {
    data: T[];
    totalElements: number;
    query: BaseQueryParams;
  }): PageRes<T> {
    const { data, totalElements, query: pagination } = params;
    const totalPages = Math.ceil(totalElements / pagination.size);
    const offset = (pagination.page - 1) * pagination.size;
    const pageSize = data.length;

    return {
      data,
      pagination: {
        number: pagination.page,
        size: pagination.size,
        totalElements,
        totalPages,
        offset,
        pageSize,
      },
    };
  }
}
