import { authSlice } from 'ducks/auth';
import characterReducer from 'ducks/character';
import userReducer from 'ducks/user';
import userSettingsReducer from 'ducks/userSettings';
import { combineReducers } from 'redux';

export const rootReducer = () => {
  return combineReducers({
    auth: authSlice.reducer,
    character: characterReducer,
    user: userReducer,
    userSettings: userSettingsReducer,
  });
};
