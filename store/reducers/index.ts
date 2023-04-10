import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import userReducer from "./userReducer";
import navReducer from "./navReducer";

export default combineReducers({
  login: loginReducer,
  user: userReducer,
  nav: navReducer,
});
