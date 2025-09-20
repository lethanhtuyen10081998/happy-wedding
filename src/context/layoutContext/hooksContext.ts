import { createContext, useContext } from 'react';

import { State } from './actions';

export const BreadcrumbContext = createContext<State['breadcrumbs']>([]);
export const useBreadcrumb = () => useContext(BreadcrumbContext);

export const CollapsibleContext = createContext<State['collapsible']>(false);
export const useCollapsible = () => useContext(CollapsibleContext);
