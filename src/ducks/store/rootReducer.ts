import { authSlice } from 'ducks/auth';
import { dataSlice } from 'ducks/data';
import userReducer from 'ducks/user';
import userSettingsReducer from 'ducks/userSettings';
import { combineReducers } from 'redux';

export const rootReducer = () => {
  return combineReducers({
    auth: authSlice.reducer,
    data: dataSlice.reducer,
    user: userReducer,
    userSettings: userSettingsReducer,
  });
};
