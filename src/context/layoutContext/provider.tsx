import React, { createContext, useContext, useMemo, useReducer } from 'react';

import { API, Actions, ActionsTypes, Breadcrumb, State } from './actions';
import { BreadcrumbContext, CollapsibleContext } from './hooksContext';

const initialState: State = {
  breadcrumbs: [],
  collapsible: false,
};

const filterReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case ActionsTypes.ON_SET_BREADCRUM:
      return { ...state, breadcrumbs: action.payload };

    case ActionsTypes.ON_COLLAPSIBLE_DRAWER:
      return { ...state, collapsible: action.payload };

    default:
      return state;
  }
};

const LayoutAPIContext = createContext<API>({} as API);

export const LayoutContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, {
    ...initialState,
  });

  const actionContext: API = useMemo(() => {
    const onSetBreadcrum = (payload: Breadcrumb[]) => {
      dispatch({ type: ActionsTypes.ON_SET_BREADCRUM, payload });
    };

    const onSetCollapsible = (payload: boolean) => {
      dispatch({ type: ActionsTypes.ON_COLLAPSIBLE_DRAWER, payload });
    };

    return {
      onSetBreadcrum,
      onSetCollapsible,
    };
  }, []);

  return (
    <LayoutAPIContext.Provider value={actionContext}>
      <CollapsibleContext.Provider value={state.collapsible}>
        <BreadcrumbContext.Provider value={state.breadcrumbs}>{children}</BreadcrumbContext.Provider>
      </CollapsibleContext.Provider>
    </LayoutAPIContext.Provider>
  );
};

export const useAPILayoutContext = () => useContext(LayoutAPIContext);
