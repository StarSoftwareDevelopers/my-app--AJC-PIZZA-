import cartTypes from "./cartTypes";
import { handleAddToCart, handleDelete, handleLessenCart } from "./cart";

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

    case cartTypes.LESSEN_CART:
      return {
        ...state,
        cartItems: handleLessenCart({
          prevCartItems: state.cartItems,
          lessCartItem: action.payload
        })
      };
    case cartTypes.CHECKOUT_CART:
      return {
        ...state,
        ...INITIAL_STATE,
      };
    default:
      return state;
  }
};

export default cartReducer;
