import React, { createContext, useContext, useMemo, useReducer } from 'react';

import { useProfileContext } from '../profileContext/hooksContext';
import { API, Actions, ActionsTypes, CartType, State } from './actions';
import {
  CartFetchingContext,
  CartLoadingContext,
  DiscountContext,
  ListCartContext,
  ListCartErrorActiveDateContext,
  SubTotalContext,
  TotalContext,
} from './hooksContext';
import { CartItemErrorActiveDate, RequestUpdateActiveDateCartItem } from './types';

const initialState: State = {
  carts: [],
  discount: 0,
  subTotal: 0,
  total: 0,
  profile: undefined,
  errors: [],
};

const cartReducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case ActionsTypes.DELETE_CART_ITEM: {
      const newCart = state.carts.filter((item) => item.id !== action.payload.cartId);

      const subTotal = newCart.reduce((previousValue, currentValue) => {
        return (currentValue.price || 0) * currentValue.quantity + previousValue;
      }, 0);

      const commission = 0;
      const discount = (subTotal * commission) / 100;
      const total = subTotal - discount;

      return {
        ...state,
        carts: newCart,
        total,
        discount,
        subTotal,
      };
    }

    case ActionsTypes.ADD_CART_ITEM: {
      const index = state?.carts?.findIndex((item) => item.id === action.payload.id);

      if (index !== -1) {
        const newCarts = state?.carts;

        newCarts[index].quantity = state?.carts[index].quantity + action.payload.quantity;

        return {
          ...state,
          carts: newCarts || [],
        };
      }

      return {
        ...state,
        carts: [...state.carts, action.payload],
      };
    }

    case ActionsTypes.UPDATE_LIST_CART: {
      const subTotal =
        action?.payload?.reduce((previousValue, currentValue) => {
          return (currentValue?.price || 0) * currentValue.quantity + previousValue;
        }, 0) || 0;

      const commission = 0;
      const discount = (subTotal * commission) / 100;
      const total = subTotal - discount;

      return {
        ...state,
        subTotal,
        carts: action?.payload || [],
        total,
        discount,
      };
    }

    case ActionsTypes.UPDATE_ACTIVE_DATE_CART_ITEM: {
      const index = state.carts.findIndex((item) => item.id === action.payload.cartItemId);

      state.carts[index] = {
        ...state.carts[index],
      };

      return {
        ...state,
      };
    }

    case ActionsTypes.UPDATE_LIST_CART_ERROR_ACTIVE_DATE: {
      return {
        ...state,
        errors: action.payload,
      };
    }

    case ActionsTypes.ON_CLEAR_ERROR_ACTIVE_DATE_CART_ITEM: {
      return {
        ...state,
        errors: state.errors.filter((item) => item.cartItemId !== action.payload.cartItemId),
      };
    }

    case ActionsTypes.UPDATE_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }

    case ActionsTypes.UPDATE_FETCHING: {
      return {
        ...state,
        fetching: action.payload,
      };
    }

    default:
      return state;
  }
};

const CartAPIContext = createContext<API>({} as API);

export const CartContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { profile } = useProfileContext();
  const [state, dispatch] = useReducer(cartReducer, {
    ...initialState,
    profile,
  });

  const actionContext: API = useMemo(() => {
    const onUpdateFetching = (payload: boolean) => {
      dispatch({ type: ActionsTypes.UPDATE_FETCHING, payload });
    };

    const onUpdateLoading = (payload: boolean) => {
      dispatch({ type: ActionsTypes.UPDATE_LOADING, payload });
    };

    const onAddCart = (payload: CartType) => {
      dispatch({ type: ActionsTypes.ADD_CART_ITEM, payload });
    };

    const onUpdateListCart = (payload: CartType[]) => {
      dispatch({ type: ActionsTypes.UPDATE_LIST_CART, payload });
    };

    const onDeleteCart = (payload: { cartId: string }) => {
      dispatch({ type: ActionsTypes.DELETE_CART_ITEM, payload });
    };

    const onUpdateQuantityCart = (payload: CartType) => {
      dispatch({ type: ActionsTypes.UPDATE_CART_ITEM, payload });
    };

    const onUpdateActiveDateCartItem = (payload: RequestUpdateActiveDateCartItem) => {
      dispatch({ type: ActionsTypes.UPDATE_ACTIVE_DATE_CART_ITEM, payload });
    };

    const onUpdateListCartErrorActiveDate = (payload: CartItemErrorActiveDate[]) => {
      dispatch({
        type: ActionsTypes.UPDATE_LIST_CART_ERROR_ACTIVE_DATE,
        payload,
      });
    };

    const onClearErrorActiveDateCartItem = (payload: CartItemErrorActiveDate) => {
      dispatch({
        type: ActionsTypes.ON_CLEAR_ERROR_ACTIVE_DATE_CART_ITEM,
        payload,
      });
    };

    return {
      onAddCart,
      onUpdateLoading,
      onUpdateFetching,
      onUpdateListCart,
      onDeleteCart,
      onUpdateQuantityCart,
      onUpdateActiveDateCartItem,
      onUpdateListCartErrorActiveDate,
      onClearErrorActiveDateCartItem,
    };
  }, []);

  return (
    <CartAPIContext.Provider value={actionContext}>
      <ListCartContext.Provider value={state.carts}>
        <TotalContext.Provider value={state.total}>
          <SubTotalContext.Provider value={state.subTotal}>
            <DiscountContext.Provider value={state.discount}>
              <ListCartErrorActiveDateContext.Provider value={state.errors}>
                <CartLoadingContext.Provider value={state.loading}>
                  <CartFetchingContext.Provider value={state.fetching}>{children}</CartFetchingContext.Provider>
                </CartLoadingContext.Provider>
              </ListCartErrorActiveDateContext.Provider>
            </DiscountContext.Provider>
          </SubTotalContext.Provider>
        </TotalContext.Provider>
      </ListCartContext.Provider>
    </CartAPIContext.Provider>
  );
};

export const useCartAPIContext = () => useContext(CartAPIContext);
