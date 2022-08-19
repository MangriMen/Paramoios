import { PayloadAction } from '@reduxjs/toolkit';
import { sendVerificationEmailRequest } from 'ducks/auth';
import { fetchUserSaga } from 'ducks/user/sagas';
import { UploadResult } from 'firebase/storage';
import {
  CallEffect,
  PutEffect,
  all,
  call,
  put,
  takeLatest,
} from 'redux-saga/effects';
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
  updateUserFailed,
  updateUserSuccess,
  updateUsername,
} from './index';

function* updateUsernameSaga({
  payload,
}: PayloadAction<string>): Generator<
  | CallEffect<void>
  | PutEffect<PayloadAction<void>>
  | PutEffect<PayloadAction<string>>,
  void,
  void
> {
  try {
    yield call(setUserDisplayName, payload);
    yield put(updateUserSuccess());
  } catch (err) {
    yield put(updateUserFailed(String(err)));
  }
}

function* updateEmailSaga({
  payload,
}: PayloadAction<string>): Generator<
  | CallEffect<void>
  | PutEffect<PayloadAction<void>>
  | PutEffect<PayloadAction<string>>,
  void,
  void
> {
  try {
    yield call(setUserEmail, payload);
    yield put(sendVerificationEmailRequest());
    yield put(updateUserSuccess());
  } catch (err) {
    yield put(updateUserFailed(String(err)));
  }
}

function* updatePasswordSaga({
  payload,
}: PayloadAction<string>): Generator<
  | CallEffect<void>
  | PutEffect<PayloadAction<void>>
  | PutEffect<PayloadAction<string>>,
  void,
  void
> {
  try {
    yield call(setUserPassword, payload);
    yield put(updateUserSuccess());
  } catch (err) {
    yield put(updateUserFailed(String(err)));
  }
}

function* updateImageSaga({
  payload,
}: PayloadAction<string>): Generator<
  | CallEffect<UploadResult>
  | CallEffect<string>
  | CallEffect<void>
  | PutEffect<PayloadAction<void>>
  | PutEffect<PayloadAction<string>>,
  void,
  UploadResult & string
> {
  try {
    const response = yield call(uploadFileToStorage, payload);
    const url = yield call(getFileUrlFromStorage, response.ref);
    yield call(setUserAvatar, url);
    yield put(updateUserSuccess());
  } catch (err) {
    yield put(updateUserFailed(String(err)));
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
