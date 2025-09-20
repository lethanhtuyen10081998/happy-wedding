import React, { createContext, useContext, useMemo, useReducer } from 'react';

import { API, Actions, ActionsTypes, RefsState, State } from './actions';
import { RefsContext } from './hooksContext';

const initialState: State = {
  refs: {},
};

const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case ActionsTypes.ON_SET_REFS:
      return {
        ...state,
        refs: {
          ...state.refs,
          ...action.payload,
        },
      };

    case ActionsTypes.ON_EXCUTE_REF: {
      const ref = state.refs?.[action.payload];
      if (ref) {
        ref?.();
      }
    }

    case ActionsTypes.ON_EXCUTE_ALL_REF: {
      Object.values(state?.refs || {}).forEach((ref) => {
        ref();
      });

      return state;
    }

    default:
      return state;
  }
};

const APIContext = createContext<API>({} as API);
export const useAPIRefsContext = () => useContext(APIContext);

export const RefsContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
  });

  const actionContext: API = useMemo(() => {
    const onSetRefs = (payload: RefsState) => {
      dispatch({ type: ActionsTypes.ON_SET_REFS, payload });
    };

    const onExcuteRef = (payload: string) => {
      dispatch({ type: ActionsTypes.ON_EXCUTE_REF, payload });
    };

    const onExcuteAllRef = () => {
      dispatch({ type: ActionsTypes.ON_EXCUTE_ALL_REF });
    };

    return {
      onSetRefs,
      onExcuteRef,
      onExcuteAllRef,
    };
  }, []);

  return (
    <APIContext.Provider value={actionContext}>
      <RefsContext.Provider value={state.refs}>{children}</RefsContext.Provider>
    </APIContext.Provider>
  );
};
