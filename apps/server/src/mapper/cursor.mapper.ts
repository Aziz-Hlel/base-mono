import type { Cursor } from '@excellense/contracts/types/Cursor';

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
