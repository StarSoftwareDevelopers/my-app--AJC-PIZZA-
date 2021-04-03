import { createSelector } from "reselect";

export const selectCartData = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartData],
  (cart) => cart.cartItems
);

export const countCartItems = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((qty, cartItem) => qty + cartItem.qty, 0)
);
