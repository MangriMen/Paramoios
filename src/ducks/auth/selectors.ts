import { RootState } from 'ducks/store';

export function getIsLoading(state: RootState) {
  return state.auth.isLoading;
}

export function getIsLogged(state: RootState) {
  return state.auth.isLogged;
}

export function getError(state: RootState) {
  return state.auth.error;
}
