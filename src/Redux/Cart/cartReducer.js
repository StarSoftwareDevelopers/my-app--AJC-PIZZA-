import cartTypes from "./cartTypes";
import { handleAddToCart, handleDelete } from "./cart";

const INITIAL_STATE = {
  cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case cartTypes.ADD_TO_CART:
      return {
        ...state,
        cartItems: handleAddToCart({
          prevCartItems: state.cartItems,
          nextCartItem: action.payload,
        }),
      };
    case cartTypes.DELETE_CART:
      return {
        ...state,
        cartItems: handleDelete({
          prevCartItems: state.cartItems,
          removeCartItem: action.payload,
        }),
      };
    default:
      return state;
  }
};

export default cartReducer;
