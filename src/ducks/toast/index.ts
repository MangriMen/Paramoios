import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ToastPayload } from './interfaces';

const initialState = {
  toasts: Array<ToastPayload>(),
};

export const toastSlice = createSlice({
  name: '@@toast',
  initialState,
  reducers: {
    enqueueToast: (state, action: PayloadAction<ToastPayload>) => {
      state.toasts = [...state.toasts, action.payload];
    },
    shiftToast: (state) => {
      state.toasts = state.toasts.slice(1);
    },
  },
});

export default toastSlice.reducer;
export const { enqueueToast, shiftToast } = toastSlice.actions;
