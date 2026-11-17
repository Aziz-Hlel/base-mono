export type Pageable = {
  number: number;
  size: number;
  offset: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
};

export type PageRes<T> = {
  data: T[];
  pagination: Pageable;
};
