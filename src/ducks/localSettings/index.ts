import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadFromLocalStorage } from 'tools/localStorage/localStorage';

import { LocalSettingsState } from './interfaces';

const initialState: LocalSettingsState = {
  theme: loadFromLocalStorage('theme', 'default'),
};

export const localSettingsSlice = createSlice({
  name: '@@localSettings',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<string>) {
      state.theme = action.payload;
    },
  },
});

export default localSettingsSlice.reducer;
export const { setTheme } = localSettingsSlice.actions;
