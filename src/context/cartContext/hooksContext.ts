import { createContext, useContext } from 'react';

import { State } from './actions';

export const ListCartContext = createContext<State['carts']>([]);
export const useListCart = () => useContext(ListCartContext);

export const SubTotalContext = createContext<State['subTotal']>(0);
export const useSubTotal = () => useContext(SubTotalContext);

export const TotalContext = createContext<State['total']>(0);
export const useTotal = () => useContext(TotalContext);

export const DiscountContext = createContext<State['discount']>(0);
export const useDiscount = () => useContext(DiscountContext);

export const ListCartErrorActiveDateContext = createContext<State['errors']>([]);
export const useListCartErrorActiveDate = () => useContext(ListCartErrorActiveDateContext);

export const CartLoadingContext = createContext<State['loading']>(false);
export const useCartLoading = () => useContext(CartLoadingContext);

export const CartFetchingContext = createContext<State['fetching']>(false);
export const useCartFetching = () => useContext(CartFetchingContext);
