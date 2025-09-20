import { createContext, useContext } from 'react';

import { State } from './actions';

export const ModuleContext = createContext<State['module']>(undefined);
export const useModuleContext = () => useContext(ModuleContext);
