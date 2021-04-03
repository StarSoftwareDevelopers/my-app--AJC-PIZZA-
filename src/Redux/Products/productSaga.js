import { auth } from "./../../firebase/firebase.utils";
import { takeLatest, put, call, all } from "redux-saga/effects";
import { setProducts, getProducts, setStateProduct } from "./productActions";
import {
  addProductHandle,
  handleGetProduct,
  handleDelete,
  handleFetch,
} from "./productsHelper";
import productTypes from "./productTypes";

//adding products
export function* addProduct({
  payload,
  // : { productName, productDesc, productPrice, productImg },
}) {
  try {
    const timeStamp = new Date();
    yield addProductHandle({
      // productName,
      // productDesc,
      // productPrice,
      // productImg,
      ...payload,
      productUserHandler: auth.currentUser.displayName,
      createdDate: timeStamp,
    });

    yield put(getProducts());
  } catch (err) {
    console.log(err);
  }
}

export function* addingProducts() {
  yield takeLatest(productTypes.ADD_PRODUCT, addProduct);
}

//fetching products
export function* getProduct() {
  try {
    const products = yield handleGetProduct();
    yield put(setProducts(products));
  } catch (err) {
    console.log(err);
  }
}

export function* gettingProducts() {
  yield takeLatest(productTypes.GET_PRODUCTS, getProduct);
}

//deleting products
export function* deleteProduct({ payload }) {
  try {
    yield handleDelete(payload);
    yield put(getProducts());
  } catch (err) {
    console.log(err);
  }
}

export function* deletingProducts() {
  yield takeLatest(productTypes.DELETE_PRODUCTS, deleteProduct);
}

export function* fetchProduct({ payload }) {
  try {
    const product = yield handleFetch(payload);
    yield put(setStateProduct(product));
  } catch (err) {
    console.log(err);
  }
}

//not sure here
export function* fetchingProducts() {
  yield takeLatest(productTypes.FETCH_PRODUCTS, fetchProduct);
}

export default function* productSaga() {
  yield all([
    call(addingProducts),
    call(gettingProducts),
    call(deletingProducts),
    call(fetchingProducts),
  ]);
}
