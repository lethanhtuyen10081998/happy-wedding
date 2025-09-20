import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { ActionEnum, ScreenName, UserRole } from 'src/types/user';

import { useProfileContext } from '../profileContext/hooksContext';
import { API, Actions, ActionsTypes, State } from './actions';
import { ModuleContext } from './hooksContext';

const initialState: State = {
  module: undefined,
};

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case ActionsTypes.ON_SET_MODULE:
      return {
        ...state,
        module: action.payload,
      };

    default:
      return state;
  }
};

const APIContext = createContext<API>({} as API);
export const useAPIModuleContext = () => useContext(APIContext);

export const ModuleContextProvider: React.FC<{
  children: React.ReactNode;
  module: ScreenName;
}> = ({ children, module }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    module,
  });
  const { profile } = useProfileContext();

  const actionContext: API = useMemo(() => {
    const onSetModuleName = (payload: ScreenName) => {
      dispatch({ type: ActionsTypes.ON_SET_MODULE, payload });
    };

    return {
      onSetModuleName,
    };
  }, []);

  const findModule = profile?.permission?.permissions?.find((item) => item.module === state.module);

  const hasPermissionView =
    profile?.permission.role === UserRole.SUPER_ADMIN ||
    (state.module && findModule && findModule.actions.includes(ActionEnum.READ));

  return (
    <APIContext.Provider value={actionContext}>
      <ModuleContext.Provider value={state.module}>
        {!hasPermissionView ? (
          <div
            style={{
              width: 'calc(100vw - 300px)',
              height: 'calc(100vh - 300px)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            No permission view page
          </div>
        ) : (
          children
        )}
      </ModuleContext.Provider>
    </APIContext.Provider>
  );
};
