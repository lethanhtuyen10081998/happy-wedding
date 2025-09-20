import { CartState } from './cart/cartType';
import { SpinnerState } from './spinner/spinnerType';
import { UserProfileState } from './userProfile/userProfileType';

export interface RootState {
  spinnerReducer: SpinnerState;
  userProfileReducer: UserProfileState;
  cartReducer: CartState;
}
