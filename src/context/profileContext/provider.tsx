import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import useProfile from 'src/services/auth/profile';
import { UserProfile } from 'src/types/user';

import { API, Actions, ActionsTypes, State } from './actions';
import { ProfileContext } from './hooksContext';

const initialState: State = {
  data: {
    loading: false,
    profile: undefined,
  },
};

const filterReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case ActionsTypes.ON_UPDATE_LOADING:
      return {
        ...state,
        data: {
          ...state.data,
          loading: action.payload,
        },
      };

    case ActionsTypes.ON_UPDATE_PROFILE:
      const newState = {
        ...state,
        data: {
          ...state.data,
          profile: action.payload,
        },
      };
      return newState;

    default:
      return state;
  }
};

const ProfileAPIContext = createContext<API>({} as API);

export const ProfileContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(filterReducer, {
    ...initialState,
  });

  const { data } = useProfile();

  console.log({ data });

  const actionContext: API = useMemo(() => {
    const onUpdateLoading = (payload: boolean) => {
      dispatch({ type: ActionsTypes.ON_UPDATE_LOADING, payload });
    };

    const onUpdateProfile = (payload: UserProfile | undefined) => {
      dispatch({ type: ActionsTypes.ON_UPDATE_PROFILE, payload });
    };

    return {
      onUpdateLoading,
      onUpdateProfile,
    };
  }, []);

  useEffect(() => {
    if (data?.data?.fullName) {
      dispatch({ type: ActionsTypes.ON_UPDATE_PROFILE, payload: data.data });
    }
  }, [data, dispatch]);

  return (
    <ProfileAPIContext.Provider value={actionContext}>
      <ProfileContext.Provider value={state.data}>{children}</ProfileContext.Provider>
    </ProfileAPIContext.Provider>
  );
};

export const useAPIProfileContext = () => useContext(ProfileAPIContext);
