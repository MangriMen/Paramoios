import { authSlice } from 'ducks/auth';
import { userSlice } from 'ducks/user';
import { combineReducers } from 'redux';

export const rootReducer = () => {
  return combineReducers({ auth: authSlice.reducer, user: userSlice.reducer });
};
