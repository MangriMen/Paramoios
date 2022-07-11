import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { EnqueueToastPayload, ToastState } from './interfaces';

const initialState: ToastState = {
  toasts: {},
};

export const toastSlice = createSlice({
  name: '@@toast',
  initialState,
  reducers: {
    enqueueToast: (
      state: ToastState,
      action: PayloadAction<EnqueueToastPayload>,
    ) => {
      const id = action.payload.id;
      const prevToastState = state.toasts[id] ?? [];
      state.toasts = {
        ...state.toasts,
        [id]: [...prevToastState, action.payload.toast],
      };
    },
    shiftToast: (state: ToastState, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state.toasts[id] === undefined) {
        return;
      }

      state.toasts = { ...state.toasts, [id]: state.toasts[id].slice(1) };
    },
  },
});

export default toastSlice.reducer;
export const { enqueueToast, shiftToast } = toastSlice.actions;
