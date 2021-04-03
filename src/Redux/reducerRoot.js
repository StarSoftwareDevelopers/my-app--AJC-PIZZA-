//
import { combineReducers } from "redux";

import cartReducer from './Cart/cartReducer';
import userReducer from "./User/user.reducer";
import prodReducer from "./Products/reducer";

export default combineReducers({
  user: userReducer,
  productsData: prodReducer,
  cartData: cartReducer
});
