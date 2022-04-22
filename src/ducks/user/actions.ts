import { types } from "./types";

export const userActions = {
  updateUser: (user: any) => ({ type: types.UPDATE_USER, payload: user }),
};
