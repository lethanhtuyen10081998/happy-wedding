export type RequestUpdateActiveDateCartItem = {
  cartItemId: string;
  activeDate: string;
};

export type CartItemErrorActiveDate = {
  cartItemId: string;
  message?: string;
};
