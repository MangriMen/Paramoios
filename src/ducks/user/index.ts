import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
  loading: false,
  userInfo: {
    userName: '',
    email: '',
    password: '',
  },
  type: 0,
};

export const userSlice = createSlice({
  name: '@@user',
  initialState,
  reducers: {
    updateUser(state, action) {
      state.error = null;
      state.loading = true;
      state.userInfo = {
        userName: '',
        email: '',
        password: '',
      };
      state.type = 0;
    },
    updateUserSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.userInfo = action.payload;
      state.type = action.payload;
    },
    updateUserError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default userSlice.reducer;
export const { updateUser, updateUserSuccess, updateUserError } =
  userSlice.actions;
