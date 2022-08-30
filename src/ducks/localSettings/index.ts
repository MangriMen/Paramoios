import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadFromLocalStorage } from 'tools/localStorage/localStorage';

import { LocalSettingsState, SettingPayload } from './interfaces';

const initialState: LocalSettingsState = {
  error: '',
  theme: loadFromLocalStorage('theme', 'default'),
};

export const localSettingsSlice = createSlice({
  name: '@@localSettings',
  initialState,
  reducers: {
    setSetting(_state, _action: PayloadAction<SettingPayload>) {},
    setSettingSuccess(state, action: PayloadAction<SettingPayload>) {
      state[action.payload.key] = action.payload.value;
      state.error = initialState.error;
    },
    setSettingFailed(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export default localSettingsSlice.reducer;
export const { setSetting, setSettingSuccess, setSettingFailed } =
  localSettingsSlice.actions;
