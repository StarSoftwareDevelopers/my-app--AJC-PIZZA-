//
import { combineReducers } from "redux";

import userReducer from "./User/user.reducer";
import prodReducer from "./Products/reducer";
import cartReducer from "./Cart/cartReducer";

export default combineReducers({
  user: userReducer,
  productsData: prodReducer,
  cart: cartReducer,
});
