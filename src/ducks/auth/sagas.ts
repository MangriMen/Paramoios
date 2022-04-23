import { call, put, takeLatest } from "redux-saga/effects";
import { authActions } from "./actions";
import { types } from "./types";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import "helpers/firebase";

function* loginSaga({ payload }: any): Generator<unknown, void, any> {
  const auth = getAuth();
  try {
    yield call(
      (payload) =>
        signInWithEmailAndPassword(auth, payload.email, payload.password),
      payload
    );
    yield put(authActions.loginSuccess());
  } catch (err) {
    yield put(authActions.loginFailed(String(err)));
  }
}

function* logoutSaga({ payload }: any): Generator<unknown, void, any> {
  const auth = getAuth();
  try {
    yield call((payload) => signOut(auth), payload);
    yield put(authActions.logoutSuccess());
  } catch (err) {
    yield put(authActions.logoutFailed(String(err)));
  }
}

export function* watchAuth() {
  yield takeLatest(types.LOGIN, loginSaga);
  yield takeLatest(types.LOGOUT, logoutSaga);
}
