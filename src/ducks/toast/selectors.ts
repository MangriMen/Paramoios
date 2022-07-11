import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'ducks/store';

export const selectToast = createSelector(
  [(state: RootState) => state.toast, (_state: RootState, id: string) => id],
  (toast, id) => (toast.toasts[id] ? toast.toasts[id][0] : {}),
);

export const selectToastsCount = createSelector(
  [(state: RootState) => state.toast, (_state: RootState, id: string) => id],
  (toast, id) => toast.toasts[id]?.length ?? 0,
);
