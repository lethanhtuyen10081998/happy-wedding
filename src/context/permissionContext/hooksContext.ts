import { createContext, useContext } from 'react';

import { State } from './actions';

export const PermissionContext = createContext<State['permission']>({
  role: '',
  permissions: [],
});
export const usePermissionContext = () => useContext(PermissionContext);
