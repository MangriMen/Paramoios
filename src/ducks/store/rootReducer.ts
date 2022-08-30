import authReducer from 'ducks/auth';
import characterReducer from 'ducks/character';
import dataReducer from 'ducks/data';
import localSettingsReducer from 'ducks/localSettings';
import userReducer from 'ducks/user';
import userSettingsReducer from 'ducks/userSettings';
import { combineReducers } from 'redux';

export const rootReducer = () => {
  return combineReducers({
    auth: authReducer,
    character: characterReducer,
    data: dataReducer,
    localSettings: localSettingsReducer,
    user: userReducer,
    userSettings: userSettingsReducer,
  });
};
