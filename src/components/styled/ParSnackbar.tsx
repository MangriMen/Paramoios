import { Alert, AlertProps, Snackbar, SnackbarProps } from '@mui/material';
import { FC } from 'react';

export interface ParSnackbarProps {
  anchorOrigin?: SnackbarProps['anchorOrigin'];
  open?: SnackbarProps['open'];
  onClose?: SnackbarProps['onClose'] & AlertProps['onClose'];
  message?: SnackbarProps['message'];
  severity?: AlertProps['severity'];
  autoHideDuration?: SnackbarProps['autoHideDuration'];
  closable?: boolean;
}

export const ParSnackbar: FC<ParSnackbarProps> = ({ closable, ...props }) => {
  return (
    <Snackbar
      key={String(props.message?.toString())}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      autoHideDuration={props.autoHideDuration}
      open={props.open}
      onClose={props.onClose}
      {...props}
    >
      <Alert
        severity={props.severity}
        onClose={closable ? props.onClose : undefined}
        variant="filled"
        sx={{
          width: '100%',
          fontSize: '1.5rem',
          '& .MuiAlert-icon': { fontSize: '2.25rem' },
        }}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export {};
