import { QueryObserverResult } from '@tanstack/react-query';
import { createContext, useContext } from 'react';

import { State } from './actions';

const createStateContext = <T>() => createContext({} as T);

export const DetailDataContext = createStateContext<State['detail']>();
export const useDetailDataContext = <T>() => useContext(DetailDataContext) as T;

// eslint-disable-next-line max-len
export const RefreshDetailDataContext = createContext<State['refreshDetailData']>(() =>
  Promise.resolve({} as QueryObserverResult<any, Error>),
);
export const useRefreshDetailData = () => useContext(RefreshDetailDataContext);
