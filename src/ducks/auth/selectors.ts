import { RootState } from 'ducks/store';

export function selectIsLoading(state: RootState) {
  return state.auth.isLoading;
}

export function selectIsLogged(state: RootState) {
  return state.auth.isLogged;
}

export function selectError(state: RootState) {
  return state.auth.error;
}
