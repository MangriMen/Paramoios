import { RootState } from "ducks/store";

export function getIsLogged(state: RootState) {
  return state.auth.isLogged;
}
