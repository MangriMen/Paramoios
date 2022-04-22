import { types } from "./types";

const initialState = {};

export function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case types.LOGIN:
      break;
    case types.LOGOUT:
      break;
    default:
      break;
  }
}
