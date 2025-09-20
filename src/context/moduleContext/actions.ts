import { ScreenName } from 'src/types/user';

export enum ActionsTypes {
  ON_SET_MODULE = 'ON_SET_MODULE',
}

export type Actions = {
  type: ActionsTypes.ON_SET_MODULE;
  payload: ScreenName;
};

export type API = {
  onSetModuleName(payload: ScreenName): void;
};

export interface State {
  module?: ScreenName;
}
