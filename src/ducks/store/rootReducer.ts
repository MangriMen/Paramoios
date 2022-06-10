import { authSlice } from 'ducks/auth';
import userReducer from 'ducks/user';
import userSettingsReducer from 'ducks/userSettings';
import { combineReducers } from 'redux';

export const rootReducer = () => {
  return combineReducers({
    auth: authSlice.reducer,
    user: userReducer,
    userSettings: userSettingsReducer,
  });
};
