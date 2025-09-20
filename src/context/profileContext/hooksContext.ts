import { createContext, useContext } from 'react';
import { UserProfile } from 'src/types/user';

import { State } from './actions';

export const ProfileContext = createContext<State['data']>({
  profile: {} as UserProfile,
  loading: false,
});

export const useProfileContext = () => useContext(ProfileContext);
