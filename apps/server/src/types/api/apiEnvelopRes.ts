type SucessStatusCodes = 200 | 201 | 204;

export interface ApiSimpleDataResponse<T> {
  status?: SucessStatusCodes;
  message: string;
  data: T;
}

export interface ApiPaginatedDataResponse<T> {
  status?: SucessStatusCodes;
  message: string;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ApiCursorResponse<T> {
  status?: SucessStatusCodes;
  message: string;
  data: T[];
  nextCursor: string | null;
}
