import { PayloadAction } from '@reduxjs/toolkit';
import { enqueueToast } from 'ducks/toast';
import { EnqueueToastPayload } from 'ducks/toast/interfaces';
import { PutEffect, put } from 'redux-saga/effects';

export function* enqueueErrorToastSaga({
  payload,
}: PayloadAction<string>): Generator<
  PutEffect<PayloadAction<EnqueueToastPayload>>,
  void,
  EnqueueToastPayload
> {
  yield put(
    enqueueToast({
      id: 'main',
      toast: { message: payload, severity: 'error' },
    }),
  );
}
