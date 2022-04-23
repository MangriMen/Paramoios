import { types } from "./types";

export const authActions = {
  login: (payload: any) => ({ type: types.LOGIN, payload }),
  logout: () => ({ type: types.LOGOUT }),
};
