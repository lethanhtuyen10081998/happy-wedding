import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { Permission } from 'src/types/user';

import { API, Actions, ActionsTypes, State } from './actions';
import { PermissionContext } from './hooksContext';

const initialState: State = {
  permission: {
    permissions: [],
    role: '',
  },
};

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case ActionsTypes.ON_UPDATE_PERMISSION:
      return {
        ...state,
        permission: action.payload,
      };

    default:
      return state;
  }
};

const APIContext = createContext<API>({} as API);
export const usePermissionAPIContext = () => useContext(APIContext);

export const PermissionContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
  });

  const actionContext: API = useMemo(() => {
    const onUpdatePermission = (payload: Permission) => {
      dispatch({ type: ActionsTypes.ON_UPDATE_PERMISSION, payload });
    };

    return {
      onUpdatePermission,
    };
  }, []);

  return (
    <APIContext.Provider value={actionContext}>
      <PermissionContext.Provider value={state.permission}>{children}</PermissionContext.Provider>
    </APIContext.Provider>
  );
};
