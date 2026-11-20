import type { Cursor } from '@base-monorepo-v2/contracts/types/Cursor';

export class CursorMapper {
  static toCursor<T>(params: { data: T[]; nextCursor: string | null; limit: number }): Cursor<T> {
    const { data, nextCursor, limit } = params;

    return {
      data,
      pagination: {
        nextCursor,
        hasNext: !!nextCursor,
        limit,
      },
    };
  }

  static toCursorWithTotalElements<T>(params: {
    data: T[];
    nextCursor: string | null;
    totalElements: number;
  }) {
    const { data: items, nextCursor, totalElements } = params;
    return {
      items,
      meta: {
        nextCursor,
        hasNext: !!nextCursor,
        totalElements,
      },
    };
  }
}
