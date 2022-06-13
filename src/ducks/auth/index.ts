import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogged: false,
  error: '',
};

export const authSlice = createSlice({
  name: '@@auth',
  initialState,
  reducers: {
    loginRequest: (state, action) => {
      state.error = '';
    },
    loginSuccess: (state) => {
      state.isLogged = true;
    },
    loginFailed: (state, action) => {
      state.isLogged = false;
      state.error = action.payload;
    },
    registerRequest: (state, action) => {
      state.error = '';
    },
    registerSuccess: (state) => {
      state.isLogged = true;
    },
    registerFailed: (state, action) => {
      state.error = action.payload;
    },
    logoutRequest: (state) => {
      state.error = '';
    },
    logoutSuccess: (state) => {
      state.isLogged = false;
    },
    logoutFailed: (state, action) => {
      state.isLogged = true;
      state.error = action.payload;
    },
  },
});

export default authSlice.reducer;
export const {
  loginRequest,
  loginSuccess,
  loginFailed,
  registerRequest,
  registerSuccess,
  registerFailed,
  logoutRequest,
  logoutSuccess,
  logoutFailed,
} = authSlice.actions;
