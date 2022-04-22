import { types } from "./types";

const initialState = {
  user: { name: "", email: "" },
};

export function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case types.UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
