import { RootState } from 'ducks/store';

export function selectUser(state: RootState) {
  return state.user.user;
}
