import { types } from "./types";

export const actions = {
  login: () => ({ type: types.LOGIN }),
  logout: () => ({ type: types.LOGOUT }),
};
