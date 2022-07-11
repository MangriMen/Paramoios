import { SnackbarCloseReason } from '@mui/material';
import { ParSnackbarProps } from 'components/styled/ParSnackbar';
import { RootState } from 'ducks/store';
import { shiftToast } from 'ducks/toast';
import { selectToast, selectToastsCount } from 'ducks/toast/selectors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useToast = (
  id: string = 'main',
  shouldCloseWhenClickAway: boolean = true,
) => {
  const dispatch = useDispatch();

  const toast = useSelector((state: RootState) => selectToast(state, id));

  const toastCount = useSelector((state: RootState) =>
    selectToastsCount(state, id),
  );

  const [message, setMessage] = useState<ParSnackbarProps['message']>('');

  const [severity, setSeverity] =
    useState<ParSnackbarProps['severity']>('info');

  const [open, setIsOpen] = useState<ParSnackbarProps['open']>(false);

  const onClose = (
    _event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (
      !shouldCloseWhenClickAway &&
      (reason === 'clickaway' || reason === 'escapeKeyDown')
    ) {
      return;
    }

    dispatch(shiftToast(id));
    setIsOpen(false);
  };

  useEffect(() => {
    if (!toastCount) {
      return;
    }

    const timerId = setTimeout(() => {
      setMessage(toast?.message);
      setSeverity(toast?.severity);
      setIsOpen(true);
    }, 150);

    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastCount]);

  return {
    message,
    severity,
    open,
    onClose,
  } as const;
};
