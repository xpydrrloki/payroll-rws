export interface PaginationQueryParams {
    take?: number;
    page?: number;
    sortBy?: string;
    sortOrder?: string;
}
export interface PaginationMeta {
    page: number;
    take: number;
    total: number;
  }