export enum ActionsTypes {
  ON_CHANGE_KEYWORD = 'ON_CHANGE_KEYWORD',
  UPDATE_LOADING = 'UPDATE_LOADING',
  ON_UPDATE_PAGE = 'ON_UPDATE_PAGE',
  ON_UPDATE_LIMIT = 'ON_UPDATE_LIMIT',
  ON_UPDATE_SORT = 'ON_UPDATE_SORT',
  ON_UPDATE_FILTER_OBJECT = 'ON_UPDATE_FILTER_OBJECT',
  ON_SET_FILTER_OBJECT = 'ON_SET_FILTER_OBJECT',
  ON_SET_FILTER_BY_COLUMN = 'ON_SET_FILTER_BY_COLUMN',
  ON_RESET_FILTER = 'ON_RESET_FILTER',
}

export type Actions =
  | {
      type: ActionsTypes.ON_CHANGE_KEYWORD;
      payload?: string;
    }
  | {
      type: ActionsTypes.UPDATE_LOADING;
      payload: boolean;
    }
  | {
      type: ActionsTypes.ON_UPDATE_PAGE;
      payload: number;
    }
  | {
      type: ActionsTypes.ON_UPDATE_LIMIT;
      payload: number;
    }
  | {
      type: ActionsTypes.ON_UPDATE_SORT;
      payload: Sort;
    }
  | {
      type: ActionsTypes.ON_UPDATE_FILTER_OBJECT;
      payload: Object;
    }
  | {
      type: ActionsTypes.ON_SET_FILTER_OBJECT;
      payload: Object;
    }
  | {
      type: ActionsTypes.ON_RESET_FILTER;
    }
  | {
      type: ActionsTypes.ON_SET_FILTER_BY_COLUMN;
      payload: Object;
    };

export type API = {
  onChangeKeyword: (value?: string) => void;
  onUpdateLoading: (value: boolean) => void;
  onUpdatePage: (value: number) => void;
  onUpdateLimit: (value: number) => void;
  onUpdateSort: (value: Sort) => void;
  onUpdateFilterObject: (value: Object) => void;
  onSetFilterObject: (value: Object) => void;
  onResetFilterObject: () => void;
  onSetFilterByColumn: (value: Object) => void;
};

export type Sort = {
  by: any;
  field: string;
};

export interface State {
  keyword?: string;
  total?: number;
  loading?: boolean;
  page?: number;
  limit?: number;
  sort?: Sort;
  filter?: Object;
  filterByColumn?: Object;
}
