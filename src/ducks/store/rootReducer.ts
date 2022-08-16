import { authSlice } from 'ducks/auth';
import localSettingsReducer from 'ducks/localSettings';
import userReducer from 'ducks/user';
import userSettingsReducer from 'ducks/userSettings';
import { combineReducers } from 'redux';

export const rootReducer = () => {
  return combineReducers({
    auth: authSlice.reducer,
    localSettings: localSettingsReducer,
    user: userReducer,
    userSettings: userSettingsReducer,
  });
};
