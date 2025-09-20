import { UserProfile } from 'src/types/user';

export type CartType = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

import { CartItemErrorActiveDate, RequestUpdateActiveDateCartItem } from './types';

export enum ActionsTypes {
  ADD_CART_ITEM = 'ADD_CART_ITEM',
  DELETE_CART_ITEM = 'DELETE_CART_ITEM',
  UPDATE_CART_ITEM = 'UPDATE_CART_ITEM',
  UPDATE_LIST_CART = 'UPDATE_LIST_CART',
  UPDATE_ACTIVE_DATE_CART_ITEM = 'UPDATE_ACTIVE_DATE_CART_ITEM',
  UPDATE_LIST_CART_ERROR_ACTIVE_DATE = 'UPDATE_LIST_CART_ERROR_ACTIVE_DATE',
  ON_CLEAR_ERROR_ACTIVE_DATE_CART_ITEM = 'ON_CLEAR_ERROR_ACTIVE_DATE_CART_ITEM',
  UPDATE_LOADING = 'UPDATE_LOADING',
  UPDATE_FETCHING = 'UPDATE_FETCHING',
}

export type Actions =
  | {
      type: ActionsTypes.UPDATE_FETCHING;
      payload: boolean;
    }
  | {
      type: ActionsTypes.UPDATE_LOADING;
      payload: boolean;
    }
  | {
      type: ActionsTypes.ADD_CART_ITEM;
      payload: CartType;
    }
  | {
      type: ActionsTypes.DELETE_CART_ITEM;
      payload: { cartId: string };
    }
  | {
      type: ActionsTypes.UPDATE_LIST_CART;
      payload: CartType[];
    }
  | {
      type: ActionsTypes.UPDATE_CART_ITEM;
      payload: CartType;
    }
  | {
      type: ActionsTypes.UPDATE_ACTIVE_DATE_CART_ITEM;
      payload: RequestUpdateActiveDateCartItem;
    }
  | {
      type: ActionsTypes.UPDATE_LIST_CART_ERROR_ACTIVE_DATE;
      payload: CartItemErrorActiveDate[];
    }
  | {
      type: ActionsTypes.ON_CLEAR_ERROR_ACTIVE_DATE_CART_ITEM;
      payload: CartItemErrorActiveDate;
    };

export type API = {
  onUpdateLoading(payload: boolean): void;
  onUpdateFetching(payload: boolean): void;
  onAddCart(payload: CartType): void;
  onUpdateListCart(payload: CartType[]): void;
  onDeleteCart(payload: { cartId: string }): void;
  onUpdateQuantityCart(payload: CartType): void;
  onUpdateActiveDateCartItem(payload: RequestUpdateActiveDateCartItem): void;
  onUpdateListCartErrorActiveDate(payload: CartItemErrorActiveDate[]): void;
  onClearErrorActiveDateCartItem(payload: CartItemErrorActiveDate): void;
};

export interface State {
  carts: CartType[];
  subTotal: number;
  total: number;
  discount: number;
  profile?: UserProfile;
  errors: CartItemErrorActiveDate[];
  loading?: boolean;
  fetching?: boolean;
}
