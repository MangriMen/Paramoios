import { combineReducers } from "redux";
import { userSlice } from "ducks/user";
import { authSlice } from "ducks/auth";

export const rootReducer = () => {
  return combineReducers({ auth: authSlice.reducer, user: userSlice.reducer });
};
