import { types } from "./types";

const initialState = {};

export function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case types.LOGIN:
      console.log("KEK");
      return state;
    case types.LOGOUT:
      return state;
    default:
      return state;
  }
}
