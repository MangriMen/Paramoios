import { createSlice } from '@reduxjs/toolkit';

const initialState = { isLoading: false, isLogged: false, error: '' };

export const authSlice = createSlice({
  name: '@@auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoading = true;
      state.error = '';
    },
    loginSuccess: (state) => {
      state.isLoading = false;
      state.isLogged = true;
    },
    loginFailed: (state, action) => {
      state.isLoading = false;
      state.isLogged = false;
      state.error = action.payload;
    },
    register: (state, action) => {
      state.isLoading = true;
      state.error = '';
    },
    registerSuccess: (state) => {
      state.isLogged = true;
      state.isLoading = false;
    },
    registerFailed: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isLoading = true;
      state.error = '';
    },
    logoutSuccess: (state) => {
      state.isLoading = false;
      state.isLogged = false;
    },
    logoutFailed: (state, action) => {
      state.isLoading = false;
      state.isLogged = true;
      state.error = action.payload;
    },
  },
});
