import { auth } from "./../../firebase/firebase.utils";
import { takeLatest, put, call, all } from "redux-saga/effects";
import { setProducts, getProducts } from "./productActions";
import {
  addProductHandle,
  handleGetProduct,
  handleDelete,
} from "./productsHelper";
import productTypes from "./productTypes";

//adding products
export function* addProduct({
  payload: { productName, productDesc, productPrice, productImg },
}) {
  try {
    const timeStamp = new Date();
    yield addProductHandle({
      productName,
      productDesc,
      productPrice,
      productImg,
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

export default function* productSaga() {
  yield all([
    call(addingProducts),
    call(gettingProducts),
    call(deletingProducts),
  ]);
}
