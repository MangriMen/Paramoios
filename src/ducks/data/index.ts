import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { DataState, Package } from './interfaces';

const initialState: DataState = {
  collected: {},
  error: '',
};

export const dataSlice = createSlice({
  name: '@@data',
  initialState,
  reducers: {
    initDataRequest: (state) => {
      state.error = initialState.error;
    },
    initDataSuccess: () => {},
    initDataFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    reloadDataRequest: (state) => {
      state.collected = {};
      state.error = initialState.error;
    },
    reloadDataSuccess: () => {},
    reloadDataFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    activatePackageRequest: (state, _action: PayloadAction<string>) => {
      state.error = initialState.error;
    },
    activatePackageSuccess: (state, action: PayloadAction<Package>) => {
      state.collected[action.payload.name] = action.payload.package;
    },
    activatePackageFailed: (state, action: PayloadAction<Package>) => {
      state.collected[action.payload.name] = action.payload.package;
      state.error = action.payload.package.error;
    },
    disablePackageRequest: (state, _action: PayloadAction<string>) => {
      state.error = initialState.error;
    },
    disablePackageSuccess: (state, action: PayloadAction<string>) => {
      delete state.collected[action.payload];
    },
    disablePackageFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    addPackageRequest: (state, _action: PayloadAction<Package>) => {
      state.error = initialState.error;
    },
    addPackageSuccess: () => {},
    addPackageFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    removePackageRequest: (state, _action: PayloadAction<string>) => {
      state.error = initialState.error;
    },
    removePackageSuccess: () => {},
    removePackageFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export default dataSlice.reducer;
export const {
  initDataRequest,
  initDataSuccess,
  initDataFailed,
  reloadDataRequest,
  reloadDataSuccess,
  reloadDataFailed,
  activatePackageRequest,
  activatePackageSuccess,
  activatePackageFailed,
  disablePackageRequest,
  disablePackageSuccess,
  disablePackageFailed,
  addPackageRequest,
  addPackageSuccess,
  addPackageFailed,
  removePackageRequest,
  removePackageSuccess,
  removePackageFailed,
} = dataSlice.actions;
