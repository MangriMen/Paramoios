import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
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
      state.error = null;
      state.isLoading = true;
    },
    fetchUserSuccess(state, action) {
      state.isLoading = false;
      state.user.avatar = action.payload.avatar;
      state.user.username = action.payload.username;
      state.user.email = action.payload.email;
    },
    fetchUserFailed(state, action) {
      state.isLoading = false;
      state.user.avatar = '';
      state.user.username = '';
      state.user.email = '';
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
export const { fetchUser, fetchUserSuccess, fetchUserFailed } =
  userSlice.actions;
