import { watchAuth } from 'ducks/auth/sagas';
import { updateSagaWatcher } from 'ducks/user/sagas';
import { all, call } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([call(watchAuth), call(updateSagaWatcher)]);
}
