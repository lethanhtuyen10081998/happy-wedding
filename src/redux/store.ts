import { combineReducers, createStore } from 'redux';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import * as reducers from './reducers';
import { RootState } from './types';

const persistConfig: PersistConfig<RootState> = {
  key: 'e-sim',
  storage,
  whitelist: [],
};

const appReducer = combineReducers<RootState>(reducers);
const persistedReducer = persistReducer(persistConfig, appReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
