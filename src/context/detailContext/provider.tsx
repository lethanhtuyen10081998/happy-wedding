import { QueryObserverResult } from '@tanstack/react-query';
import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

import { API, Actions, ActionsTypes, State } from './actions';
import { DetailDataContext, RefreshDetailDataContext } from './hooksContext';

const initialState: State = {
  detail: {},
  refreshDetailData: () => Promise.resolve({} as QueryObserverResult<any, Error>),
};

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case ActionsTypes.ON_UPDATE_DETAIL_DATA:
      return { ...state, detail: action.payload };

    default:
      return state;
  }
};

const DetailDataAPIContext = createContext<API>({} as API);

export const DetailDataContextProvider = ({
  children,
  data,
  refreshDetailData,
}: {
  children: React.ReactNode;
  data: any;
  refreshDetailData?: () => Promise<QueryObserverResult<any, Error>>;
}) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    detail: data,
    refreshDetailData: refreshDetailData || initialState.refreshDetailData,
  });

  const actionContext: API = useMemo(() => {
    const onUpdateDetailData = (payload?: any) => {
      dispatch({ type: ActionsTypes.ON_UPDATE_DETAIL_DATA, payload });
    };

    return {
      onUpdateDetailData,
    };
  }, []);

  useEffect(() => {
    actionContext.onUpdateDetailData(data);
  }, [actionContext, data]);

  return (
    <DetailDataAPIContext.Provider value={actionContext}>
      <RefreshDetailDataContext.Provider value={state.refreshDetailData}>
        <DetailDataContext.Provider value={state.detail}>{children}</DetailDataContext.Provider>
      </RefreshDetailDataContext.Provider>
    </DetailDataAPIContext.Provider>
  );
};

export const useAPIDetailDataContext = () => useContext(DetailDataAPIContext);
