import { AlertProps } from '@mui/material';

export interface ToastPayload {
  message: string;
  severity: AlertProps['severity'];
}
