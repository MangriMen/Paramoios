import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  setUserDisplayName,
  setUserEmail,
  setUserPassword,
} from 'tools/requests/requests';

import {
  updateEmail,
  updatePassword,
  updateUserError,
  updateUserSuccess,
  updateUsername,
} from './index';

//add update requests.ts
function* updateUsernameSaga({ payload }: any): Generator<unknown, void, any> {
  try {
    //yield call(setUserDisplayName, payload);
    console.log('YES');
    yield put(updateUserSuccess());
  } catch (err) {
    yield put(updateUserError(err));
  }
}

function* updateEmailSaga({ payload }: any): Generator<unknown, void, any> {
  try {
    //yield call(setUserEmail, payload);
    console.log('YES');
    yield put(updateUserSuccess());
  } catch (err) {
    yield put(updateUserError(err));
  }
}

function* updatePasswordSaga({ payload }: any): Generator<unknown, void, any> {
  try {
    //yield call(setUserPassword, payload);
    console.log('YES');
    yield put(updateUserSuccess());
  } catch (err) {
    yield put(updateUserError(err));
  }
}

export function* updateSagaWatcher() {
  yield all([
    takeLatest(updateUsername, updateUsernameSaga),
    takeLatest(updateEmail, updateEmailSaga),
    takeLatest(updatePassword, updatePasswordSaga),
  ]);
}
