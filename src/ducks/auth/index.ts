import { createSlice } from '@reduxjs/toolkit';

const initialState = { isLogged: false, error: '' };

export const authSlice = createSlice({
  name: '@@auth',
  initialState,
  reducers: {
    login: (state, action) => {},
    loginSuccess: (state) => {
      state.isLogged = true;
    },
    loginFailed: (state, action) => {
      state.isLogged = false;
      state.error = action.payload;
    },
    register: (state, action) => {},
    registerSuccess: (state) => {
      state.isLogged = true;
    },
    registerFailed: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {},
    logoutSuccess: (state) => {
      state.isLogged = false;
    },
    logoutFailed: (state, action) => {
      state.isLogged = true;
      state.error = action.payload;
    },
  },
});
