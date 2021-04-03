import productTypes from "./productTypes";

export const addProducts = (dataProduct) => ({
  type: productTypes.ADD_PRODUCT,
  payload: dataProduct,
});

export const getProducts = () => ({
  type: productTypes.GET_PRODUCTS,
});

export const setProducts = (products) => ({
  type: productTypes.SET_PRODUCTS,
  payload: products,
});

export const deleteProducts = (productID) => ({
  type: productTypes.DELETE_PRODUCTS,
  payload: productID,
});

//not sure here
export const fetchProducts = (productID) => ({
  type: productTypes.FETCH_PRODUCTS,
  payload: productID,
});

//not sure here
export const setStateProduct = (product) => ({
  type: productTypes.SET_STATE_PRODUCTS,
  payload: product,
});
