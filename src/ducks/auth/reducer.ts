import { types } from "./types";

const initialState = {};

export function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case types.LOGIN:
      console.log("TRY LOGIN");
      return state;
    case types.LOGIN_SUCCESS:
      console.log("LOGIN SUCCESS");
      return state;
    case types.LOGIN_FAILED:
      console.log("LOGIN FAILED");
      return state;
    case types.LOGOUT:
      console.log("TRY LOGOUT");
      return state;
    case types.LOGOUT_SUCCESS:
      console.log("LOGOUT SUCCESS");
      return state;
    case types.LOGOUT_FAILED:
      console.log("LOGOUT FAILED");
      return state;
    case types.REGISTER:
      console.log("TRY REGISTER");
      return state;
    case types.REGISTER_SUCCESS:
      console.log("REGISTER_SUCCES");
      return state;
    case types.REGISTER_FAILED:
      console.log("REGISTER_FAILED");
      return state;
    default:
      return state;
  }
}
