import { watchAuth } from 'ducks/auth/sagas';
import { watchCharacter } from 'ducks/character/sagas';
import { watchData } from 'ducks/data/sagas';
import { watchLocalSettings } from 'ducks/localSettings/sagas';
import { fetchSagaWatcher } from 'ducks/user/sagas';
import { updateSagaWatcher } from 'ducks/userSettings/sagas';
import { all, call } from 'redux-saga/effects';

export function* rootSaga() {
  yield all([
    call(watchAuth),
    call(watchCharacter),
    call(watchData),
    call(watchLocalSettings),
    call(fetchSagaWatcher),
    call(updateSagaWatcher),
  ]);
}
