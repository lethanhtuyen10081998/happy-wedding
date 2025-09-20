import { UserProfileAction } from './userProfileAction';
import { SET_USER_PROFILE, UserProfileState } from './userProfileType';

const initialState: UserProfileState = null;

export function userProfileReducer(
  state: UserProfileState = initialState,
  action: UserProfileAction,
): UserProfileState {
  switch (action.type) {
    case SET_USER_PROFILE:
      return action.payload;
    default:
      return state;
  }
}
