import { PayloadAction } from '@reduxjs/toolkit';
import { UserCredential } from 'firebase/auth';
import {
  CallEffect,
  PutEffect,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import { setUserDisplayName } from 'tools/requests/requests';

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
  | PutEffect<PayloadAction<string>>,
  void,
  UserCredential
> {
  try {
    yield call(login, payload);
    yield put(loginSuccess());
  } catch (err) {
    yield put(loginFailed(String(err)));
  }
}

function* registerSaga({
  payload,
}: PayloadAction<RegisterPayload>): Generator<
  | CallEffect<UserCredential>
  | CallEffect<Promise<void> | undefined>
  | PutEffect<PayloadAction<undefined>>
  | PutEffect<PayloadAction<string>>,
  void,
  UserCredential
> {
  try {
    yield call(register, payload);
    yield call(setUserDisplayName, payload.username);
    yield put(registerSuccess());
  } catch (err) {
    yield put(registerFailed(String(err)));
  }
}

function* logoutSaga(): Generator<
  | CallEffect<void>
  | PutEffect<PayloadAction<undefined>>
  | PutEffect<PayloadAction<string>>,
  void,
  void
> {
  try {
    yield call(logout);
    yield put(logoutSuccess());
  } catch (err) {
    yield put(logoutFailed(String(err)));
  }
}

export function* watchAuth() {
  yield takeLatest(loginRequest, loginSaga);
  yield takeLatest(registerRequest, registerSaga);
  yield takeLatest(logoutRequest, logoutSaga);
}
