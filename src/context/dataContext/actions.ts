import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

import { Data } from './types';

export enum ActionsTypes {
  ON_UPDATE_DATA = 'ON_UPDATE_DATA',
  ON_REFRESH_DATA = 'ON_REFRESH_DATA',
  UPDATE_LOADING = 'UPDATE_LOADING',
  ON_SET_RECORD_DELETE = 'ON_SET_RECORD_DELETE',
  ON_RESET_RECORD_DELETE = 'ON_RESET_RECORD_DELETE',
}

export type RefetchFunction = (
  options?: RefetchOptions | undefined,
) => Promise<QueryObserverResult<any, Error>>;

export type Actions =
  | {
      type: ActionsTypes.ON_UPDATE_DATA;
      payload: Data;
    }
  | {
      type: ActionsTypes.ON_REFRESH_DATA;
      payload: RefetchFunction;
    }
  | {
      type: ActionsTypes.UPDATE_LOADING;
      payload: boolean;
    }
  | {
      type: ActionsTypes.ON_SET_RECORD_DELETE;
      payload: any;
    }
  | {
      type: ActionsTypes.ON_RESET_RECORD_DELETE;
    };

export type API = {
  onUpdateData: (data: Data) => void;
  onSetFunctionRefreshData: (func: RefetchFunction) => void;
  onUpdateLoading: (value: boolean) => void;
  onSetRecordDelete: (value: any) => void;
  onResetRecordDelete: () => void;
};

export interface State {
  data: Data;
  refreshData: RefetchFunction;
  loading: boolean;
  recordDelete: string[];
}
