import { PayloadAction } from '@reduxjs/toolkit';
import { PACKAGES, STORAGE } from 'consts';
import { defaultPackage } from 'mocks/mockDefaultPackage';
import {
  CallEffect,
  PutEffect,
  all,
  put,
  takeLatest,
} from 'redux-saga/effects';

import {
  activatePackageFailed,
  activatePackageRequest,
  activatePackageSuccess,
  addPackageFailed,
  addPackageSuccess,
  initDataFailed,
  initDataRequest,
  initDataSuccess,
  reloadDataFailed,
  reloadDataRequest,
  reloadDataSuccess,
  removePackageFailed,
  removePackageSuccess,
} from './index';
import { Package } from './interfaces';
import {
  dumpObjectToDisk,
  loadObjectFromDisk,
  loadOrInitObjectFromDisk,
} from './services';

export function* initSaga(): Generator<
  PutEffect<PayloadAction<void>> | PutEffect<PayloadAction<string>>,
  void,
  void
> {
  try {
    const activePackages = loadOrInitObjectFromDisk(STORAGE.activePackages, []);
    if (!activePackages.includes(PACKAGES.defaultPackage)) {
      dumpObjectToDisk(STORAGE.activePackages, [
        ...activePackages,
        PACKAGES.defaultPackage,
      ]);
    }

    const packages = loadOrInitObjectFromDisk(STORAGE.packages, {});
    if (!(PACKAGES.defaultPackage in packages)) {
      dumpObjectToDisk(STORAGE.packages, {
        ...packages,
        default: defaultPackage,
      });
    }

    yield put(initDataSuccess());
  } catch (err) {
    yield put(initDataFailed(String(err)));
  }
}

export function* reloadSaga(): Generator<
  | CallEffect<any>
  | PutEffect<PayloadAction<string>>
  | PutEffect<PayloadAction<void>>
  | PutEffect<PayloadAction<string>>,
  void,
  void
> {
  try {
    const activePackages = loadObjectFromDisk(STORAGE.activePackages);
    for (const pkg of activePackages) {
      yield put(activatePackageRequest(pkg));
    }
    yield put(reloadDataSuccess());
  } catch (err) {
    yield put(reloadDataFailed(String(err)));
  }
}

export function* activatePackageSaga({
  payload,
}: PayloadAction<string>): Generator<
  PutEffect<PayloadAction<Package>> | PutEffect<PayloadAction<string>>,
  void,
  void
> {
  try {
    const packages = loadObjectFromDisk(STORAGE.packages);
    const pkg = packages[payload];
    yield put(activatePackageSuccess({ name: payload, data: pkg }));
  } catch (err) {
    yield put(activatePackageFailed(String(err)));
  }
}

export function* addPackageSaga({
  payload,
}: PayloadAction<Package>): Generator<
  PutEffect<PayloadAction<void>> | PutEffect<PayloadAction<string>>,
  void,
  void
> {
  try {
    const packages = loadObjectFromDisk(STORAGE.packages);
    const newPackages = { ...packages, [payload.name]: payload.data };
    dumpObjectToDisk(STORAGE.packages, newPackages);
    yield put(addPackageSuccess());
  } catch (err) {
    yield put(addPackageFailed(String(err)));
  }
}

export function* removePackageSaga({
  payload,
}: PayloadAction<Package>): Generator<
  PutEffect<PayloadAction<void>> | PutEffect<PayloadAction<string>>,
  void,
  void
> {
  try {
    const packages = loadObjectFromDisk(STORAGE.packages);
    delete packages[payload.name];
    dumpObjectToDisk(STORAGE.packages, packages);
    yield put(removePackageSuccess());
  } catch (err) {
    yield put(removePackageFailed(String(err)));
  }
}

export function* watchData() {
  yield all([
    takeLatest(initDataRequest, initSaga),
    takeLatest(reloadDataRequest, reloadSaga),
    takeLatest(activatePackageRequest, activatePackageSaga),
  ]);
}
