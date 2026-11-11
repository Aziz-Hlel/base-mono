type SucessStatusCodes = 200 | 201 | 204;

export interface ApiSimpleDataResponse<T = any> {
  status?: SucessStatusCodes;
  message: string;
  data: T;
}

export interface ApiPaginatedDataResponse<T = any> {
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

export interface ApiCursorResponse<T = any> {
  status?: SucessStatusCodes;
  message: string;
  data: T[];
  nextCursor: string | null;
}
