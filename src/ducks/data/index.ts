import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import i18n from 'configs/i18next';
import { PACKAGES } from 'consts';

import { DataState, Package } from './interfaces';

const initialState: DataState = {
  collected: {},
  error: '',
};

export const dataSlice = createSlice({
  name: '@@data',
  initialState,
  reducers: {
    initDataRequest: () => {},
    initDataSuccess: (state) => {
      state.error = initialState.error;
    },
    initDataFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    reloadDataRequest: (state) => {
      state.collected = {};
    },
    reloadDataSuccess: (state) => {
      state.error = initialState.error;
    },
    reloadDataFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    activatePackageRequest: (_state, _action: PayloadAction<string>) => {},
    activatePackageSuccess: (state, action: PayloadAction<Package>) => {
      state.collected[action.payload.name] = action.payload.package;
    },
    activatePackageFailed: (state, action: PayloadAction<Package>) => {
      state.collected[action.payload.name] = action.payload.package;
      state.error = action.payload.package.error;
    },
    disablePackage: (state, action: PayloadAction<string>) => {
      for (const lng in state.collected[action.payload].translation) {
        i18n.removeResourceBundle(lng, PACKAGES.translationNs);
      }

      delete state.collected[action.payload];

      for (const pkg in state.collected) {
        for (const lng in state.collected[pkg].translation) {
          i18n.addResourceBundle(
            lng,
            PACKAGES.translationNs,
            state.collected[pkg].translation[lng],
            true,
          );
        }
      }
    },
    addPackageRequest: (_state, _action: PayloadAction<Package>) => {},
    addPackageSuccess: (state) => {
      state.error = initialState.error;
    },
    addPackageFailed: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    removePackageRequest: (_state, action: PayloadAction<string>) => {},
    removePackageSuccess: (state) => {
      state.error = initialState.error;
    },
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
  disablePackage,
  addPackageRequest,
  addPackageSuccess,
  addPackageFailed,
  removePackageRequest,
  removePackageSuccess,
  removePackageFailed,
} = dataSlice.actions;
