import { PayloadAction } from '@reduxjs/toolkit';
import { activatePackageRequest } from 'ducks/data';
import { all, put, takeLatest } from 'redux-saga/effects';

import {
  loadCharacterFailed,
  loadCharacterRequest,
  loadCharacterSuccess,
} from '.';
import { CharacterSave } from './interfaces';

function* loadCharacterSaga({
  payload,
}: PayloadAction<CharacterSave>): Generator {
  try {
    const packages = payload.packages.split(',');

    for (const pkg of packages) {
      yield put(activatePackageRequest(pkg));
    }

    yield put(loadCharacterSuccess(payload));
  } catch (err) {
    yield put(loadCharacterFailed(String(err)));
  }
}

export function* watchCharacter() {
  yield all([takeLatest(loadCharacterRequest, loadCharacterSaga)]);
}
