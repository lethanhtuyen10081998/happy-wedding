import { Permission } from 'src/types/user';

export enum ActionsTypes {
  ON_UPDATE_PERMISSION = 'ON_UPDATE_PERMISSION',
}

export type Actions = {
  type: ActionsTypes.ON_UPDATE_PERMISSION;
  payload: Permission;
};

export type API = {
  onUpdatePermission(payload: Permission): void;
};

export interface State {
  permission: Permission;
}
