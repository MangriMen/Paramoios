import { createSlice } from '@reduxjs/toolkit';
import { auth } from 'configs/firebase';

const initialState = {
  isLogged: !auth?.currentUser,
  error: '',
};

export const authSlice = createSlice({
  name: '@@auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.error = '';
    },
    loginSuccess: (state, action) => {
      state.isLogged = true;
    },
    loginFailed: (state, action) => {
      state.isLogged = false;
      state.error = action.payload;
    },
    register: (state, action) => {
      state.error = '';
    },
    registerSuccess: (state, action) => {
      state.isLogged = true;
    },
    registerFailed: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
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
