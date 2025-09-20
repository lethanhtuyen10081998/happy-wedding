export type PagingDataResponse<T> = {
  rows: T[];
  limit: number;
  page: number;
  total: number;
};

export type PagingDataRequest = {
  limit: number;
  page: number;
  keySort?: string;
  typeSort?: SortType;
};

export enum SortType {
  DESC = 'DESC',
  ASC = 'ASC',
}
