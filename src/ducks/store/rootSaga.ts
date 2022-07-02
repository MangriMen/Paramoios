import { watchAuth } from 'ducks/auth/sagas';
import { fetchSagaWatcher } from 'ducks/user/sagas';
import { updateSagaWatcher } from 'ducks/userSettings/sagas';
import { all, call } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([call(watchAuth), call(fetchSagaWatcher), call(updateSagaWatcher)]);
}
