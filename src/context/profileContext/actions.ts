import { UserProfile } from 'src/types/user';

export enum ActionsTypes {
  ON_UPDATE_PROFILE = 'ON_UPDATE_PROFILE',
  ON_UPDATE_LOADING = 'ON_UPDATE_LOADING',
}

export type Actions =
  | {
      type: ActionsTypes.ON_UPDATE_PROFILE;
      payload: UserProfile | undefined;
    }
  | {
      type: ActionsTypes.ON_UPDATE_LOADING;
      payload: boolean;
    };

export type API = {
  onUpdateProfile(payload: UserProfile | undefined): void;
  onUpdateLoading(payload: boolean): void;
};

export interface State {
  data: {
    profile?: UserProfile;
    loading: boolean;
  };
}
