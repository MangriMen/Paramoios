import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { UserSettingsState } from './interfaces';

const initialState: UserSettingsState = {
  error: '',
  loading: {
    username: false,
    email: false,
    password: false,
    image: false,
  },
};

export const userSettingsSlice = createSlice({
  name: '@@user',
  initialState,
  reducers: {
    updateUsername(state, _action: PayloadAction<string>) {
      state.error = initialState.error;
      state.loading.username = true;
    },
    updateEmail(state, action) {
      state.error = initialState.error;
      state.loading.email = true;
    },
    updatePassword(state, action) {
      state.error = initialState.error;
      state.loading.password = true;
    },
    updateImage(state, action) {
      state.error = initialState.error;
      state.loading.image = true;
    },
    updateUserSuccess(state) {
      state.error = initialState.error;
      state.loading = initialState.loading;
    },
    updateUserFailed(state, action) {
      state.error = action.payload;
      state.loading = initialState.loading;
    },
  },
});

export default userSettingsSlice.reducer;
export const {
  updateUsername,
  updateEmail,
  updatePassword,
  updateImage,
  updateUserSuccess,
  updateUserFailed,
} = userSettingsSlice.actions;
