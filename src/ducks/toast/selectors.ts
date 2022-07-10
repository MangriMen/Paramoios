import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'ducks/store';

// export function selectToastCount(state: RootState) {
//   return state.toast.toasts.length;
// }

// export function selectFirstToast(state: RootState) {
//   return state.toast.toasts[0];
// }

export const selectToast = createSelector(
  [(state: RootState) => state.toast, (_state: RootState, id: string) => id],
  (toast, id) => (toast.toasts[id] ? toast.toasts[id][0] : {}),
);

export const selectToastCount = createSelector(
  [(state: RootState) => state.toast, (_state: RootState, id: string) => id],
  (toast, id) => toast.toasts[id]?.length ?? 0,
);

export {};
