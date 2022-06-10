import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  getFileUrlFromStorage,
  setUserAvatar,
  setUserDisplayName,
  setUserEmail,
  setUserPassword,
  uploadFileToStorage,
} from 'tools/requests/requests';

import {
  updateEmail,
  updateImage,
  updatePassword,
  updateUserError,
  updateUserSuccess,
  updateUsername,
} from './index';

//add update requests.ts
function* updateUsernameSaga({ payload }: any): Generator<unknown, void, any> {
  try {
    yield call(setUserDisplayName, payload);
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

function* updateImageSaga({ payload }: any): Generator<unknown, void, any> {
  try {
    const response = yield call(uploadFileToStorage, payload);
    const url = yield call(getFileUrlFromStorage, response.ref);
    yield call(setUserAvatar, url);
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
    takeLatest(updateImage, updateImageSaga),
  ]);
}
