import { watchAuth } from 'ducks/auth/sagas';
import { all, call } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([call(watchAuth)]);
}
