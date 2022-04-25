import { call, put, takeLatest } from "redux-saga/effects";
import { authActions } from "./actions";
import { login, logout, register, setUserDisplayName } from "./services";
import { types } from "./types";

function* loginSaga({ payload }: any): Generator<unknown, void, any> {
  try {
    yield call(login, payload);
    yield put(authActions.loginSuccess());
  } catch (err) {
    yield put(authActions.loginFailed(String(err)));
  }
}

function* logoutSaga({ payload }: any): Generator<unknown, void, any> {
  try {
    yield call(logout, payload);
    yield put(authActions.logoutSuccess());
  } catch (err) {
    yield put(authActions.logoutFailed(String(err)));
  }
}

function* registerSaga({ payload }: any): Generator<unknown, void, any> {
  try {
    yield call(register, payload);
    yield put(authActions.registerSuccess());
  } catch (err) {
    yield put(authActions.registerFailed(String(err)));
  }
  yield call(setUserDisplayName, payload);
}

export function* watchAuth() {
  yield takeLatest(types.LOGIN, loginSaga);
  yield takeLatest(types.LOGOUT, logoutSaga);
  yield takeLatest(types.REGISTER, registerSaga);
}
