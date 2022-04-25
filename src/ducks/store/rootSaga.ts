import { all, call } from "redux-saga/effects";
import { watchAuth } from "ducks/auth/sagas";

export function* rootSaga() {
  yield all([call(watchAuth)]);
}
