import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
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
    updateUsername(state, action) {
      state.error = null;
      state.loading.username = true;
    },
    updateEmail(state, action) {
      state.error = null;
      state.loading.email = true;
    },
    updatePassword(state, action) {
      state.error = null;
      state.loading.password = true;
    },
    updateImage(state, action) {
      state.error = null;
      state.loading.image = true;
    },
    updateUserSuccess(state) {
      state.error = null;
      state.loading = {
        username: false,
        email: false,
        password: false,
        image: false,
      };
    },
    updateUserFailed(state, action) {
      state.error = action.payload;
      state.loading = {
        username: false,
        email: false,
        password: false,
        image: false,
      };
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
