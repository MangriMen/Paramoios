import { types } from "./types";

export const authActions = {
  login: (payload: any) => ({ type: types.LOGIN, payload }),
  loginSuccess: () => ({ type: types.LOGIN_SUCCESS }),
  loginFailed: (payload: any) => ({ type: types.LOGIN_FAILED, payload }),
  logout: () => ({ type: types.LOGOUT }),
  logoutSuccess: () => ({ type: types.LOGOUT_SUCCESS }),
  logoutFailed: (payload: any) => ({ type: types.LOGOUT_FAILED, payload }),
  register: (payload: any) => ({ type: types.REGISTER, payload }),
  registerSuccess: () => ({ type: types.REGISTER_SUCCESS }),
  registerFailed: (payload: any) => ({ type: types.REGISTER_FAILED, payload }),
};
