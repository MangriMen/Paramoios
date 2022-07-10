import { AlertProps } from '@mui/material';

export interface ToastState {
  toasts: { [x: string]: Array<ToastPayload> };
}

export interface ToastPayload {
  message?: string;
  severity?: AlertProps['severity'];
}

export interface EnqueueToastPayload {
  id: string;
  toast: ToastPayload;
}
