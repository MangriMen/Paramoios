import { PayloadAction } from '@reduxjs/toolkit';
import i18n from 'configs/i18next';
import { PACKAGES, STORAGE } from 'consts';
import { RootState } from 'ducks/store';
import { defaultPackage } from 'mocks/mockDefaultPackage';
import {
  CallEffect,
  PutEffect,
  SelectEffect,
  all,
  put,
  select,
  takeLatest,
} from 'redux-saga/effects';

import {
  activatePackageFailed,
  activatePackageRequest,
  activatePackageSuccess,
  addPackageFailed,
  addPackageRequest,
  addPackageSuccess,
  disablePackageFailed,
  disablePackageRequest,
  disablePackageSuccess,
  initDataFailed,
  initDataRequest,
  initDataSuccess,
  reloadDataFailed,
  reloadDataRequest,
  reloadDataSuccess,
  removePackageFailed,
  removePackageSuccess,
} from './index';
import { DataState, Package } from './interfaces';
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
    const packages = loadOrInitObjectFromDisk(STORAGE.packages, {});
    if (!(PACKAGES.defaultPackage in packages)) {
      dumpObjectToDisk(STORAGE.packages, {
        ...packages,
        default: defaultPackage,
      });
    }

    const activePackages = loadOrInitObjectFromDisk(
      STORAGE.activePackages,
      new Set([]),
    );
    if (!activePackages.includes(PACKAGES.defaultPackage)) {
      dumpObjectToDisk(
        STORAGE.activePackages,
        new Set([...activePackages, PACKAGES.defaultPackage]),
      );
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
    const pkg: Package['package'] = packages[payload];
    for (const lng in pkg.translation) {
      i18n.addResourceBundle(
        lng,
        PACKAGES.translationNs,
        pkg.translation[lng],
        true,
      );
    }

    const activePackages = loadOrInitObjectFromDisk(STORAGE.activePackages, []);
    dumpObjectToDisk(
      STORAGE.activePackages,
      new Set([...activePackages, payload]),
    );

    yield put(activatePackageSuccess({ name: payload, package: pkg }));
  } catch (err) {
    yield put(
      activatePackageFailed({
        name: payload,
        package: { data: {}, translation: {}, error: String(err) },
      }),
    );
  }
}

export function* disablePackageSaga({
  payload,
}: PayloadAction<string>): Generator<
  | SelectEffect
  | PutEffect<PayloadAction<Package>>
  | PutEffect<PayloadAction<string>>,
  void,
  void
> {
  try {
    const collected = (yield select(
      (state: RootState) => state.data.collected,
    )) as unknown as DataState['collected'];

    for (const lng in collected[payload].translation) {
      i18n.removeResourceBundle(lng, PACKAGES.translationNs);
    }
    for (const pkg in collected) {
      for (const lng in collected[pkg].translation) {
        if (lng in collected[payload].translation) {
          i18n.addResourceBundle(
            lng,
            PACKAGES.translationNs,
            collected[pkg].translation[lng],
            true,
          );
        }
      }
    }
    yield put(disablePackageSuccess(payload));
  } catch (err) {
    yield put(disablePackageFailed(String(err)));
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
    const newPackages = { ...packages, [payload.name]: payload.package };
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
    takeLatest(disablePackageRequest, disablePackageSaga),
    takeLatest(addPackageRequest, addPackageSaga),
  ]);
}
