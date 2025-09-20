import { UserProfile } from 'src/types/user';

import { SET_USER_PROFILE } from './userProfileType';

export interface SetUserProfileAction {
  type: typeof SET_USER_PROFILE;
  payload: UserProfile;
}

export type UserProfileAction = SetUserProfileAction;
