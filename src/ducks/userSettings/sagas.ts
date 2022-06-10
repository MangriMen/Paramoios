import { all, call, put, takeLatest } from 'redux-saga/effects';
import {
  getFileUrlFromStorage,
  setUserAvatar,
  setUserDisplayName,
  setUserEmail,
  setUserPassword,
  uploadFileToStorage,
} from 'tools/requests/requests';

import { fetchUserSaga } from '../user/sagas';
import {
  updateEmail,
  updateImage,
  updatePassword,
  updateUserFailed,
  updateUserSuccess,
  updateUsername,
} from './index';

function* updateUsernameSaga({ payload }: any): Generator<unknown, void, any> {
  try {
    yield call(setUserDisplayName, payload);
    yield put(updateUserSuccess());
  } catch (err) {
    yield put(updateUserFailed(err));
  }
}

function* updateEmailSaga({ payload }: any): Generator<unknown, void, any> {
  try {
    yield call(setUserEmail, payload);
    yield put(updateUserSuccess());
  } catch (err) {
    yield put(updateUserFailed(err));
  }
}

function* updatePasswordSaga({ payload }: any): Generator<unknown, void, any> {
  try {
    yield call(setUserPassword, payload);
    yield put(updateUserSuccess());
  } catch (err) {
    yield put(updateUserFailed(err));
  }
}

function* updateImageSaga({ payload }: any): Generator<unknown, void, any> {
  try {
    const response = yield call(uploadFileToStorage, payload);
    const url = yield call(getFileUrlFromStorage, response.ref);
    yield call(setUserAvatar, url);
    yield put(updateUserSuccess());
  } catch (err) {
    yield put(updateUserFailed(err));
  }
}

export function* updateSagaWatcher() {
  yield all([
    takeLatest(updateUserSuccess, fetchUserSaga),
    takeLatest(updateUsername, updateUsernameSaga),
    takeLatest(updateEmail, updateEmailSaga),
    takeLatest(updatePassword, updatePasswordSaga),
    takeLatest(updateImage, updateImageSaga),
  ]);
}
