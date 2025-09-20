import { CartAction } from './cartAction';
import { ADD_ITEM_TO_CART, CartState, DELETE_CART_ITEM, UPDATE_LIST_CART } from './cartType';

const initialState: CartState = {
  carts: [],
  total: 0,
};

export function cartReducer(state: CartState = initialState, action: CartAction): CartState {
  switch (action.type) {
    case ADD_ITEM_TO_CART: {
      const index = state.carts.findIndex(
        (item) => item.package.productid === action.payload.package.productid,
      );

      if (index !== -1) {
        const newCarts = state.carts;

        newCarts[index].quantity = state.carts[index].quantity + action.payload.quantity;

        return {
          ...state,
          carts: newCarts,
        };
      }

      return {
        ...state,
        carts: [...state.carts, action.payload],
      };
    }

    case DELETE_CART_ITEM: {
      const newCart = state.carts.filter((item) => item.id !== action.payload);

      return {
        ...state,
        carts: newCart,
      };
    }

    case UPDATE_LIST_CART: {
      const total = action.payload.reduce((previousValue, currentValue) => {
        return currentValue.package.price_to_app * currentValue.quantity + previousValue;
      }, 0);

      return {
        ...state,
        total,
        carts: action.payload,
      };
    }

    default:
      return state;
  }
}
