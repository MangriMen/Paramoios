import { ParSnackbarProps } from 'components/styled/ParSnackbar';
import { shiftToast } from 'ducks/toast';
import { selectFirstToast, selectToastCount } from 'ducks/toast/selectors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useToast = () => {
  const dispatch = useDispatch();

  const toast = useSelector(selectFirstToast);
  const toastCount = useSelector(selectToastCount);

  const [currentMessage, setCurrentMessage] =
    useState<ParSnackbarProps['message']>('');
  const [currentMessageSeverity, setCurrentMessageSeverity] =
    useState<ParSnackbarProps['severity']>('info');
  const [isOpen, setIsOpen] = useState<ParSnackbarProps['open']>(false);

  useEffect(() => {
    if (!toastCount) {
      return;
    }

    const timerId = setTimeout(() => {
      setCurrentMessage(toast?.message);
      setCurrentMessageSeverity(toast?.severity);
      setIsOpen(true);
    }, 150);

    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toastCount]);

  const handleClose = () => {
    dispatch(shiftToast());
    setIsOpen(false);
  };

  return {
    message: currentMessage,
    severity: currentMessageSeverity,
    open: isOpen,
    handleClose,
  } as const;
};
