import { takeLatest } from "redux-saga/effects";
import {} from "./actions";
import { types } from "./types";

function* loginSaga({ payload }: any): Generator<unknown, void, any> {
  try {
    yield "kek";
    // yield call(tipoFetch, payload);
    // yield put(authActions.loginSuccess());
  } catch (err) {
    // yield put(authActions.loginError(String(err)));
  }
}

export function* watchAuth() {
  yield takeLatest(types.LOGIN, loginSaga);
}
