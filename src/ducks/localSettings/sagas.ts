import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'ducks/store';
import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { saveToLocalStorage } from 'tools/localStorage/localStorage';

import {
  setSetting,
  setSettingFailed,
  setSettingSuccess,
  setThemeTimer,
} from './index';
import { LocalSettingsState, SettingPayload } from './interfaces';
import { postAction, preAction } from './services';

function* setSettingSaga({ payload }: PayloadAction<SettingPayload>) {
  try {
    saveToLocalStorage(payload.key, payload.value);

    yield call(preAction, payload);
    yield put(setSettingSuccess(payload));
    yield call(postAction, {
      payload,
      state: (yield select(
        (state: RootState) => state.localSettings.themeChangeTimer,
      )) as LocalSettingsState,
      setThemeTimer,
    });
  } catch (err) {
    yield put(setSettingFailed(String(err)));
  }
}

export function* watchLocalSettings() {
  yield all([takeLatest(setSetting, setSettingSaga)]);
}
