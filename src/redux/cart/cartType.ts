import { CartType } from 'src/types/cart';

export interface CartState {
  carts: CartType[];
  total: number;
}

export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const DELETE_CART_ITEM = 'DELETE_CART_ITEM';
export const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM';
export const UPDATE_LIST_CART = 'UPDATE_LIST_CART';
