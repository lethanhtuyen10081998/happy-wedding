import { QueryObserverResult } from '@tanstack/react-query';
import React, { createContext, useContext, useMemo, useReducer } from 'react';

import { API, Actions, ActionsTypes, RefetchFunction, State } from './actions';
import {
  DataContext,
  LoadingContext,
  RecordDeleteContext,
  RefreshDataContext,
} from './hooksContext';
import { Data } from './types';

const initialState: State = {
  data: {
    rows: [],
    total: 0,
  },
  refreshData: () => Promise.resolve({} as QueryObserverResult<any, Error>),
  loading: false,
  recordDelete: [],
};

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case ActionsTypes.ON_UPDATE_DATA: {
      return { ...state, data: action.payload };
    }

    case ActionsTypes.ON_REFRESH_DATA: {
      return { ...state, refreshData: action.payload };
    }

    case ActionsTypes.UPDATE_LOADING:
      return { ...state, loading: action.payload };

    case ActionsTypes.ON_SET_RECORD_DELETE:
      return { ...state, recordDelete: [...state.recordDelete, action.payload] };

    case ActionsTypes.ON_RESET_RECORD_DELETE:
      return { ...state, recordDelete: [] };

    default:
      return state;
  }
};

const APIContext = createContext<API>({} as API);

export const DataContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
  });

  const actionContext: API = useMemo(() => {
    const onUpdateData = (payload: Data) => {
      dispatch({ type: ActionsTypes.ON_UPDATE_DATA, payload });
    };

    const onSetFunctionRefreshData = (payload: RefetchFunction) => {
      dispatch({ type: ActionsTypes.ON_REFRESH_DATA, payload });
    };

    const onUpdateLoading = (payload: boolean) => {
      dispatch({ type: ActionsTypes.UPDATE_LOADING, payload });
    };

    const onSetRecordDelete = (payload: any) => {
      dispatch({ type: ActionsTypes.ON_SET_RECORD_DELETE, payload });
    };

    const onResetRecordDelete = () => {
      dispatch({ type: ActionsTypes.ON_RESET_RECORD_DELETE });
    };

    return {
      onUpdateData,
      onSetFunctionRefreshData,
      onUpdateLoading,
      onSetRecordDelete,
      onResetRecordDelete,
    };
  }, []);

  return (
    <APIContext.Provider value={actionContext}>
      <RecordDeleteContext.Provider value={state.recordDelete}>
        <RefreshDataContext.Provider value={state.refreshData}>
          <DataContext.Provider value={{ rows: state.data.rows, total: state.data.total }}>
            <LoadingContext.Provider value={state.loading}>{children}</LoadingContext.Provider>
          </DataContext.Provider>
        </RefreshDataContext.Provider>
      </RecordDeleteContext.Provider>
    </APIContext.Provider>
  );
};

export const useAPIDataContext = () => useContext(APIContext);
