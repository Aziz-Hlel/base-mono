import type { BaseQueryParams } from '@excellense/contracts/request-parameters/query-params.base-schema';
import type { Page } from '@excellense/contracts/types/Page';

export class PageMapper {
  static toPageRes<T>(params: {
    data: T[];
    totalElements: number;
    query: BaseQueryParams;
  }): Page<T> {
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
