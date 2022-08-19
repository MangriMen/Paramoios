import { PayloadAction } from '@reduxjs/toolkit';
import { all, put, takeLatest } from 'redux-saga/effects';
import { saveToLocalStorage } from 'tools/localStorage/localStorage';

import { setSetting, setSettingFailed, setSettingSuccess } from './index';
import { SettingPayload } from './interfaces';

export function* setSettingSaga({ payload }: PayloadAction<SettingPayload>) {
  try {
    saveToLocalStorage(payload.key, payload.value);
    yield put(setSettingSuccess(payload));
  } catch (err) {
    yield put(setSettingFailed(String(err)));
  }
}

export function* watchLocalSettings() {
  yield all([takeLatest(setSetting, setSettingSaga)]);
}
