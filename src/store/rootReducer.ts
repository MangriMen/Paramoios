import { combineReducers } from "redux";
import { userReducer } from "ducks/user";
import { authReducer } from "ducks/auth";

export const createRootReducer = () => {
  return combineReducers({ auth: authReducer, user: userReducer });
};
