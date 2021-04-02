import productTypes from "./productTypes";

const initialState = {
  products: [],
  product: {}, //not sure here
};

const prodReducer = (state = initialState, action) => {
  switch (action.type) {
    case productTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    //not sure here
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
