import { PayloadAction } from '@reduxjs/toolkit';
import { EnqueueToastPayload } from 'ducks/toast/interfaces';
import { fetchUserSaga } from 'ducks/user/sagas';
import { UserCredential } from 'firebase/auth';
import { getErrorMessage } from 'helpers/errors';
import {
  CallEffect,
  PutEffect,
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { setUserDisplayName } from 'tools/requests/requests';
import { enqueueErrorToastSaga } from 'tools/sagas/sagas';

import {
  loginFailed,
  loginRequest,
  loginSuccess,
  logoutFailed,
  logoutRequest,
  logoutSuccess,
  registerFailed,
  registerRequest,
  registerSuccess,
} from './index';
import { LoginPayload, RegisterPayload } from './interfaces';
import { login, logout, register } from './services';

function* loginSaga({
  payload,
}: PayloadAction<LoginPayload>): Generator<
  | CallEffect<UserCredential>
  | PutEffect<PayloadAction<undefined>>
  | PutEffect<PayloadAction<EnqueueToastPayload>>
  | PutEffect<PayloadAction<string>>,
  void,
  UserCredential
> {
  try {
    yield call(login, payload);
    yield put(loginSuccess());
  } catch (err) {
    yield put(loginFailed(getErrorMessage(err)));
  }
}

function* registerSaga({
  payload,
}: PayloadAction<RegisterPayload>): Generator<
  | CallEffect<UserCredential>
  | CallEffect<void>
  | PutEffect<PayloadAction<undefined>>
  | PutEffect<PayloadAction<EnqueueToastPayload>>
  | PutEffect<PayloadAction<string>>,
  void,
  UserCredential
> {
  try {
    yield call(register, payload);
    yield call(setUserDisplayName, payload.username);
    yield put(registerSuccess());
  } catch (err) {
    yield put(registerFailed(getErrorMessage(err)));
  }
}

function* logoutSaga(): Generator<
  | CallEffect<void>
  | PutEffect<PayloadAction<undefined>>
  | PutEffect<PayloadAction<EnqueueToastPayload>>
  | PutEffect<PayloadAction<string>>,
  void,
  void
> {
  try {
    yield call(logout);
    yield put(logoutSuccess());
  } catch (err) {
    yield put(logoutFailed(getErrorMessage(err)));
  }
}

export function* watchAuth() {
  yield all([
    takeLatest(loginRequest, loginSaga),
    takeLatest(loginSuccess, fetchUserSaga),
    takeLatest(loginFailed, enqueueErrorToastSaga),
    takeLatest(registerRequest, registerSaga),
    takeLatest(registerFailed, enqueueErrorToastSaga),
    takeLatest(logoutRequest, logoutSaga),
    takeLatest(logoutSuccess, fetchUserSaga),
    takeLatest(logoutFailed, enqueueErrorToastSaga),
  ]);
}
