import { PayloadAction } from '@reduxjs/toolkit';
import { all, takeLatest } from 'redux-saga/effects';
import { saveToLocalStorage } from 'tools/localStorage/localStorage';

import { setTheme } from './index';

export function setThemeSaga({ payload }: PayloadAction<string>) {
  saveToLocalStorage('theme', payload);
}

export function* watchLocalSettings() {
  yield all([takeLatest(setTheme, setThemeSaga)]);
}
