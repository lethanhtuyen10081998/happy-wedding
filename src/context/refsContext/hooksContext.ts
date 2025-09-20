import { createContext, useContext } from 'react';

import { State } from './actions';

export const RefsContext = createContext<State['refs']>({});
export const useRefsContext = () => useContext(RefsContext);
