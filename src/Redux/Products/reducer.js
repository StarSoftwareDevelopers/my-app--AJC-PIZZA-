import productTypes from "./productTypes";

const initialState = {
  products: [],
};

const prodReducer = (state = initialState, action) => {
  switch (action.type) {
    case productTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

export default prodReducer;
