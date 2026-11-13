export class CursorMapper {
  static toCursor<T>(params: { data: T[]; nextCursor: string | null }) {
    const { data: items, nextCursor } = params;

    return {
      items,
      meta: {
        nextCursor,
        hasNext: !!nextCursor,
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
