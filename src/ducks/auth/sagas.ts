import { authSlice } from 'ducks/auth';
import { call, put, takeLatest } from 'redux-saga/effects';

import { login, logout, register, setUserDisplayName } from './services';

function* loginSaga({ payload }: any): Generator<unknown, void, any> {
  try {
    yield call(login, payload);
    yield put(authSlice.actions.loginSuccess());
  } catch (err) {
    yield put(authSlice.actions.loginFailed(String(err)));
  }
}

function* registerSaga({ payload }: any): Generator<unknown, void, any> {
  try {
    yield call(register, payload);
    yield put(authSlice.actions.registerSuccess());
  } catch (err) {
    yield put(authSlice.actions.registerFailed(String(err)));
  }
  yield call(setUserDisplayName, payload);
}

function* logoutSaga(): Generator<unknown, void, any> {
  try {
    yield call(logout);
    yield put(authSlice.actions.logoutSuccess());
  } catch (err) {
    yield put(authSlice.actions.logoutFailed(String(err)));
  }
}

export function* watchAuth() {
  yield takeLatest(authSlice.actions.login, loginSaga);
  yield takeLatest(authSlice.actions.register, registerSaga);
  yield takeLatest(authSlice.actions.logout, logoutSaga);
}
