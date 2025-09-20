import { QueryObserverResult } from '@tanstack/react-query';
import { createContext, useContext } from 'react';

import { State } from './actions';

export const DataContext = createContext<State['data']>({
  rows: [],
  total: 0,
});
export const useData = <T = any>() => useContext(DataContext) as { rows: T[]; total: number };

// eslint-disable-next-line max-len
export const RefreshDataContext = createContext<State['refreshData']>(() =>
  Promise.resolve({} as QueryObserverResult<any, Error>),
);
export const useRefreshData = () => useContext(RefreshDataContext);

export const LoadingContext = createContext<State['loading']>(false);
export const useLoading = () => useContext(LoadingContext);

export const RecordDeleteContext = createContext<State['recordDelete']>([]);
export const useRecordDelete = () => useContext(RecordDeleteContext);
