import productTypes from "./productTypes";

const initialState = {
  products: [],
  product: {}, //
};

const prodReducer = (state = initialState, action) => {
  switch (action.type) {
    case productTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    //
    case productTypes.SET_STATE_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export default prodReducer;
