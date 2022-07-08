import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { FetchUserPayload } from './interfaces';

const initialState = {
  error: '',
  isLoading: false,
  user: {
    avatar: '',
    username: '',
    email: '',
  },
};

export const userSlice = createSlice({
  name: '@@user',
  initialState,
  reducers: {
    fetchUser(state) {
      state.error = initialState.error;
      state.isLoading = true;
    },
    fetchUserSuccess(state, action: PayloadAction<FetchUserPayload>) {
      state.isLoading = initialState.isLoading;
      state.user.username = action.payload.username;
      state.user.email = action.payload.email;
      state.user.avatar = action.payload.avatar;
    },
    fetchUserFailed(state, action: PayloadAction<string>) {
      state.isLoading = initialState.isLoading;
      state.user = initialState.user;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { fetchUser, fetchUserSuccess, fetchUserFailed } =
  userSlice.actions;
