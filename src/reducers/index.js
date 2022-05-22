import authReducers from "./auth.reducers";
import userReducers from "./user.reducers";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  auth: authReducers,
  user: userReducers,
});

export default rootReducers;
