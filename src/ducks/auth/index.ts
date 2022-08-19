import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AuthState, LoginPayload, RegisterPayload } from './interfaces';

const initialState: AuthState = {
  isLoading: true,
  isLogged: false,
  error: '',
};

export const authSlice = createSlice({
  name: '@@auth',
  initialState,
  reducers: {
    loginRequest: (state, _action: PayloadAction<LoginPayload>) => {
      state.isLoading = true;
      state.isLogged = initialState.isLogged;
      state.error = initialState.error;
    },
    loginSuccess: (state) => {
      state.isLoading = false;
      state.isLogged = true;
      state.error = initialState.error;
    },
    loginFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isLogged = initialState.isLogged;
      state.error = action.payload;
    },
    registerRequest: (state, action: PayloadAction<RegisterPayload>) => {
      state.isLoading = true;
      state.isLogged = initialState.isLogged;
      state.error = initialState.error;
    },
    registerSuccess: (state) => {
      state.isLoading = false;
      state.isLogged = true;
      state.error = initialState.error;
    },
    registerFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isLogged = initialState.isLogged;
      state.error = action.payload;
    },
    logoutRequest: (state) => {
      state.isLoading = true;
      state.error = initialState.error;
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
      state.isLogged = initialState.isLogged;
      state.error = initialState.error;
    },
    logoutFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.isLogged = true;
      state.error = action.payload;
    },
    sendVerificationEmailRequest: (state) => {
      state.error = initialState.error;
    },
    sendVerificationEmailSuccess: (state) => {
      state.error = initialState.error;
    },
    sendVerificationEmailFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    deleteUserRequest: (state) => {
      state.isLoading = true;
      state.error = initialState.error;
    },
    deleteUserSuccess: (state) => {
      state.isLoading = false;
      state.isLogged = false;
    },
    deleteUserFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
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
  sendVerificationEmailRequest,
  sendVerificationEmailSuccess,
  sendVerificationEmailFailed,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailed,
} = authSlice.actions;
