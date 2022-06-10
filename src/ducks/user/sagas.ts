import { all, call, put, takeLatest } from 'redux-saga/effects';

import { fetchUser, fetchUserFailed, fetchUserSuccess } from './index';
import { get } from './services';

export function* fetchUserSaga(): Generator<unknown, void, any> {
  try {
    const response = yield call(get);
    yield put(
      fetchUserSuccess({
        username: response?.displayName,
        email: response?.email,
        avatar: response?.photoURL,
      }),
    );
  } catch (err) {
    yield put(fetchUserFailed(err));
  }
}

export function* fetchSagaWatcher() {
  yield all([takeLatest(fetchUser, fetchUserSaga)]);
}
