import { all, takeLatest } from 'redux-saga/effects';

import { updateUser } from './index';

//add update requests
export function* updateSagas({ payload }: any): Generator<unknown, void, any> {
  try {
    console.log(payload.userInfo[payload.name]);
  } catch (e) {
    console.log(payload);
  }
}

export function* updateSagaWatcher() {
  yield all([takeLatest(updateUser, updateSagas)]);
}
