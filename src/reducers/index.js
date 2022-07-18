import authReducers from "./auth.reducers";
import userReducers from "./user.reducers";
import categoryReducers from "./category.reducers";
import ordersReducers from "./orders.reducers";
import productReducers from "./product.reducers";
import pageReducer from "./page.reducer";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  auth: authReducers,
  user: userReducers,
  category: categoryReducers,
  order: ordersReducers,
  product: productReducers,
  page: pageReducer,
});

export default rootReducers;
