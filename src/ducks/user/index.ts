import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { FetchUserPayload } from './interfaces';

const initialState = {
  isLoading: false,
  error: '',
  user: {
    avatar: '',
    username: '',
    email: '',
    isEmailVerified: false,
  },
};

export const userSlice = createSlice({
  name: '@@user',
  initialState,
  reducers: {
    fetchUser(state) {
      state.isLoading = true;
      state.error = initialState.error;
      state.user = initialState.user;
    },
    fetchUserSuccess(state, action: PayloadAction<FetchUserPayload>) {
      state.isLoading = initialState.isLoading;
      state.error = initialState.error;
      state.user.username = action.payload.username;
      state.user.email = action.payload.email;
      state.user.avatar = action.payload.avatar;
      state.user.isEmailVerified = action.payload.isEmailVerified;
    },
    fetchUserFailed(state, action: PayloadAction<string>) {
      state.isLoading = initialState.isLoading;
      state.error = action.payload;
      state.user = initialState.user;
    },
  },
});

export default userSlice.reducer;
export const { fetchUser, fetchUserSuccess, fetchUserFailed } =
  userSlice.actions;
