import { RootState } from 'ducks/store';

export function selectToastCount(state: RootState) {
  return state.toast.toasts.length;
}

export function selectFirstToast(state: RootState) {
  return state.toast.toasts[0];
}
