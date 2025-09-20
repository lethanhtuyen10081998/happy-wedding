import React, { createContext, useContext, useMemo, useReducer } from 'react';

import { API, Actions, ActionsTypes, Sort, State } from './actions';
import { FilterByColumnContext, FilterObjectContext, KeywordContext, LimitContext, LoadingContext, PageContext, SortContext } from './hooksContext';

const initialState: State = {
  keyword: undefined,
  limit: 50,
  loading: false,
  page: 1,
  total: 0,
  sort: undefined,
};

const filterReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case ActionsTypes.ON_CHANGE_KEYWORD:
      return { ...state, keyword: action.payload };

    case ActionsTypes.ON_UPDATE_LIMIT:
      return { ...state, limit: action.payload };

    case ActionsTypes.ON_UPDATE_PAGE:
      return { ...state, page: action.payload };

    case ActionsTypes.ON_UPDATE_SORT:
      return { ...state, sort: action.payload, page: 1 };

    case ActionsTypes.UPDATE_LOADING:
      return { ...state, loading: action.payload };

    case ActionsTypes.ON_UPDATE_FILTER_OBJECT:
      return { ...state, filter: { ...state.filter, ...action.payload }, page: 1 };

    case ActionsTypes.ON_RESET_FILTER:
      return { ...state, filter: {} };

    case ActionsTypes.ON_SET_FILTER_OBJECT:
      return { ...state, filter: action.payload };

    case ActionsTypes.ON_SET_FILTER_BY_COLUMN:
      return { ...state, filterByColumn: action.payload, page: 1 };

    default:
      return state;
  }
};

const FilterAPIContext = createContext<API>({} as API);

export const FilterContextProvider = ({ children, filter, defaultState }: { children: React.ReactNode; filter?: Object; defaultState?: State }) => {
  const [state, dispatch] = useReducer(filterReducer, {
    ...initialState,
    filter,
    ...defaultState,
  });

  const actionContext: API = useMemo(() => {
    const onChangeKeyword = (payload?: string) => {
      dispatch({ type: ActionsTypes.ON_CHANGE_KEYWORD, payload });
    };

    const onUpdateLimit = (payload: number) => {
      dispatch({ type: ActionsTypes.ON_UPDATE_LIMIT, payload });
    };

    const onUpdateLoading = (payload: boolean) => {
      dispatch({ type: ActionsTypes.UPDATE_LOADING, payload });
    };

    const onUpdatePage = (payload: number) => {
      dispatch({ type: ActionsTypes.ON_UPDATE_PAGE, payload });
    };

    const onUpdateSort = (payload: Sort) => {
      dispatch({ type: ActionsTypes.ON_UPDATE_SORT, payload });
    };

    const onUpdateFilterObject = (payload: Object) => {
      dispatch({ type: ActionsTypes.ON_UPDATE_FILTER_OBJECT, payload });
    };

    const onResetFilterObject = () => {
      dispatch({ type: ActionsTypes.ON_RESET_FILTER });
    };

    const onSetFilterObject = (payload: Object) => {
      dispatch({ type: ActionsTypes.ON_SET_FILTER_OBJECT, payload });
    };

    const onSetFilterByColumn = (payload: Object) => {
      dispatch({ type: ActionsTypes.ON_SET_FILTER_BY_COLUMN, payload });
    };

    return {
      onChangeKeyword,
      onUpdateLimit,
      onUpdateLoading,
      onUpdatePage,
      onUpdateSort,
      onUpdateFilterObject,
      onResetFilterObject,
      onSetFilterObject,
      onSetFilterByColumn,
    };
  }, []);

  return (
    <FilterAPIContext.Provider value={actionContext}>
      <KeywordContext.Provider value={state.keyword}>
        <LimitContext.Provider value={state.limit}>
          <LoadingContext.Provider value={state.loading}>
            <PageContext.Provider value={state.page}>
              <SortContext.Provider value={state.sort}>
                <FilterObjectContext.Provider value={state.filter}>
                  <FilterByColumnContext.Provider value={state.filterByColumn}>{children}</FilterByColumnContext.Provider>
                </FilterObjectContext.Provider>
              </SortContext.Provider>
            </PageContext.Provider>
          </LoadingContext.Provider>
        </LimitContext.Provider>
      </KeywordContext.Provider>
    </FilterAPIContext.Provider>
  );
};

export const useAPIFilterContext = () => useContext(FilterAPIContext);
