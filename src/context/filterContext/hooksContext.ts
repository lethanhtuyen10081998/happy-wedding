import { createContext, useContext } from 'react';

import { State } from './actions';

export const KeywordContext = createContext<State['keyword']>(undefined);
export const useKeyword = () => useContext(KeywordContext);

export const LimitContext = createContext<State['limit']>(10);
export const useLimit = () => useContext(LimitContext);

export const LoadingContext = createContext<State['loading']>(false);
export const useLoading = () => useContext(LoadingContext);

export const PageContext = createContext<State['page']>(1);
export const usePage = () => useContext(PageContext);

export const SortContext = createContext<State['sort']>(undefined);
export const useSort = () => useContext(SortContext);

const createStateContext = <T>() => createContext({} as T);

export const FilterObjectContext = createStateContext<State['filter']>();
export const useFilterObjectContext = <T>() => useContext(FilterObjectContext) as T;

export const FilterByColumnContext = createStateContext<State['filterByColumn']>();
export const useFilterByColumnContext = <T>() => useContext(FilterByColumnContext) as T;
