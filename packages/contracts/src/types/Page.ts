export type Pageable = {
  number: number;
  size: number;
  offset: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};

export type Page<T> = {
  data: T[];
  pagination: Pageable;
};
