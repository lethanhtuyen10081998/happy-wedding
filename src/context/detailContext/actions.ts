import { QueryObserverResult } from '@tanstack/react-query';

export enum ActionsTypes {
  ON_UPDATE_DETAIL_DATA = 'ON_UPDATE_DETAIL_DATA',
}

export type Actions = {
  type: ActionsTypes.ON_UPDATE_DETAIL_DATA;
  payload?: string;
};

export type API = {
  onUpdateDetailData: (value?: any) => void;
};

export interface State {
  detail: any;
  refreshDetailData: () => Promise<QueryObserverResult<any, Error>>;
}
