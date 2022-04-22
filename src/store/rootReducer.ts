import { combineReducers } from "redux";
import { userReducer } from "ducks/user";

export const createRootReducer = () => {
  return combineReducers({ user: userReducer });
};
