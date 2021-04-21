import cartTypes from "./cartTypes";

export const addProduct = (nextCartItem) => ({
  type: cartTypes.ADD_TO_CART,
  payload: nextCartItem,
});

export const deleteProduct = (cartItem) => ({
  type: cartTypes.DELETE_CART,
  payload: cartItem,
});

export const checkingOutCart = () => ({
  type: cartTypes.CHECKOUT_CART,
});

export const lessenCartItem = (cartItem) => ({
  type: cartTypes.LESSEN_CART,
  payload: cartItem
});
