import { RootState } from "ducks/store";

export function getUser(state: RootState) {
  return state.user.user;
}
