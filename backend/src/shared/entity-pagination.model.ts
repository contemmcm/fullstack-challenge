export interface EntityPagination<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}
