import { call, put, takeLatest } from 'redux-saga/effects';
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
import { login, logout, register } from './services';

function* loginSaga({ payload }: any): Generator<unknown, void, any> {
  try {
    yield call(login, payload);
    yield put(loginSuccess());
  } catch (err) {
    yield put(loginFailed(String(err)));
  }
}

function* registerSaga({ payload }: any): Generator<unknown, void, any> {
  try {
    yield call(register, payload);
    yield call(setUserDisplayName, payload);
    yield put(registerSuccess());
  } catch (err) {
    yield put(registerFailed(String(err)));
  }
}

function* logoutSaga(): Generator<unknown, void, any> {
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
