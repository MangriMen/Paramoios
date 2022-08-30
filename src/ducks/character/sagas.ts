import { PayloadAction } from '@reduxjs/toolkit';
import { activatePackageRequest } from 'ducks/data';
import { DataState } from 'ducks/data/interfaces';
import { RootState } from 'ducks/store';
import {
  CallEffect,
  PutEffect,
  SelectEffect,
  all,
  call,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import {
  loadCharacterFailed,
  loadCharacterRequest,
  loadCharacterSuccess,
} from '.';
import { CharacterSave } from './interfaces';
import { getCharacterPackagesList } from './services';

function* loadCharacterSaga({
  payload,
}: PayloadAction<CharacterSave>): Generator<
  | CallEffect<string[]>
  | PutEffect<PayloadAction<string>>
  | SelectEffect
  | PutEffect<PayloadAction<CharacterSave>>
  | PutEffect<PayloadAction<string>>,
  void,
  void
> {
  try {
    const packages = (yield call(
      getCharacterPackagesList,
      payload,
    )) as unknown as string[];

    for (const pkg of packages) {
      yield put(activatePackageRequest(pkg));
    }

    const collected = (yield select(
      (state: RootState) => state.data.collected,
    )) as unknown as DataState['collected'];

    for (const loadedPkg in collected) {
      if (collected[loadedPkg].error) {
        throw new Error(`Error when loading package: "${loadedPkg}"`);
      }
    }
    yield put(loadCharacterSuccess(payload));
  } catch (err) {
    yield put(loadCharacterFailed(String(err)));
  }
}

export function* watchCharacter() {
  yield all([takeLatest(loadCharacterRequest, loadCharacterSaga)]);
}
