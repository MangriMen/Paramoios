import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { LoginPayload, RegisterPayload } from './interfaces';

const initialState = {
  isLoading: false,
  isLogged: false,
  error: '',
};

export const authSlice = createSlice({
  name: '@@auth',
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<LoginPayload>) => {
      state.isLoading = true;
      state.error = '';
    },
    loginSuccess: (state) => {
      state.isLoading = false;
      state.isLogged = true;
    },
    loginFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isLogged = false;
      state.error = action.payload;
    },
    registerRequest: (state, action: PayloadAction<RegisterPayload>) => {
      state.isLoading = true;
      state.error = '';
    },
    registerSuccess: (state) => {
      state.isLogged = true;
      state.isLoading = false;
    },
    registerFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logoutRequest: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
      state.isLogged = false;
    },
    logoutFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isLogged = true;
      state.error = action.payload;
    },
    deleteUserRequest: (state) => {
      state.isLoading = true;
      state.error = initialState.error;
    },
    deleteUserSuccess: () => {},
    deleteUserFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
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
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailed,
} = authSlice.actions;
