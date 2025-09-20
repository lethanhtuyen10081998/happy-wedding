import { CartType } from 'src/types/cart';

import { ADD_ITEM_TO_CART, DELETE_CART_ITEM, UPDATE_CART_ITEM, UPDATE_LIST_CART } from './cartType';

export interface AddItemToCartAction {
  type: typeof ADD_ITEM_TO_CART;
  payload: CartType;
}

export interface DeleteCartAction {
  type: typeof DELETE_CART_ITEM;
  payload: string;
}

export interface UpdateCartAction {
  type: typeof UPDATE_CART_ITEM;
  payload: CartType;
}

export interface UpdateListCartAction {
  type: typeof UPDATE_LIST_CART;
  payload: CartType[];
}

export type CartAction =
  | AddItemToCartAction
  | DeleteCartAction
  | UpdateCartAction
  | UpdateListCartAction;
