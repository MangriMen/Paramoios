import { authSlice } from 'ducks/auth';
import { call, put, takeLatest } from 'redux-saga/effects';
import { setUserDisplayName } from 'tools/requests/requests';

import { login, logout, register } from './services';

function* loginSaga({ payload }: any): Generator<unknown, void, any> {
  try {
    const response = yield call(login, payload);
    yield put(
      authSlice.actions.loginSuccess({
        avatar: response.user.photoURL,
        token: response.user.accessToken,
      }),
    );
  } catch (err) {
    yield put(authSlice.actions.loginFailed(String(err)));
  }
}

function* registerSaga({ payload }: any): Generator<unknown, void, any> {
  try {
    const response = yield call(register, payload);
    yield call(setUserDisplayName, payload);
    yield put(
      authSlice.actions.registerSuccess({
        avatar: response.user.photoURL,
        token: response.user.accessToken,
      }),
    );
  } catch (err) {
    yield put(authSlice.actions.registerFailed(String(err)));
  }
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
