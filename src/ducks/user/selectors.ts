import { RootState } from 'ducks/store';

export function selectIsLoading(state: RootState) {
  return state.user.isLoading;
}

export function selectUser(state: RootState) {
  return state.user.user;
}

export function selectError(state: RootState) {
  return state.user.error;
}
