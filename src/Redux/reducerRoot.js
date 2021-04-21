//
import { combineReducers } from "redux";

//---persist
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; //----

import userReducer from "./User/user.reducer";
import prodReducer from "./Products/reducer";
import cartReducer from "./Cart/cartReducer";

export const reducerRoot = combineReducers({
  user: userReducer,
  productsData: prodReducer,
  cart: cartReducer,
});

//---

const localStorage = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

export default persistReducer(localStorage, reducerRoot);
