import { PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import {
  CallEffect,
  PutEffect,
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';

import { fetchUser, fetchUserFailed, fetchUserSuccess } from './index';
import { FetchUserPayload } from './interfaces';
import { get } from './services';

export function* fetchUserSaga(): Generator<
  | CallEffect<User | null | undefined>
  | PutEffect<PayloadAction<FetchUserPayload>>
  | PutEffect<PayloadAction<string>>,
  void,
  User | null | undefined
> {
  try {
    const response = yield call(get);
    yield put(
      fetchUserSuccess({
        username: response?.displayName,
        email: response?.email,
        avatar: response?.photoURL,
      }),
    );
  } catch (err) {
    yield put(fetchUserFailed(String(err)));
  }
}

export function* fetchSagaWatcher() {
  yield all([takeLatest(fetchUser, fetchUserSaga)]);
}
