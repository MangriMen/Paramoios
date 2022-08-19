import { PayloadAction } from '@reduxjs/toolkit';
import { fetchUserSaga } from 'ducks/user/sagas';
import { UserCredential } from 'firebase/auth';
import {
  CallEffect,
  PutEffect,
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
import {
  sendVerificationEmail,
  setUserDisplayName,
} from 'tools/requests/requests';

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
  sendVerificationEmailFailed,
  sendVerificationEmailRequest,
  sendVerificationEmailSuccess,
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
  | CallEffect<void>
  | PutEffect<PayloadAction<undefined>>
  | PutEffect<PayloadAction<string>>,
  void,
  UserCredential
> {
  try {
    yield call(register, payload);
    yield call(setUserDisplayName, payload.username);
    yield put(sendVerificationEmailRequest());
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

function* sendVerificationEmailSaga(): Generator<
  | CallEffect<void>
  | PutEffect<PayloadAction<void>>
  | PutEffect<PayloadAction<string>>,
  void,
  void
> {
  try {
    yield call(sendVerificationEmail);
    yield put(sendVerificationEmailSuccess());
  } catch (err) {
    yield put(sendVerificationEmailFailed(String(err)));
  }
}

export function* watchAuth() {
  yield all([
    takeLatest(logoutSuccess, fetchUserSaga),
    takeLatest(loginRequest, loginSaga),
    takeLatest(registerRequest, registerSaga),
    takeLatest(logoutRequest, logoutSaga),
    takeLatest(sendVerificationEmailRequest, sendVerificationEmailSaga),
  ]);
}
