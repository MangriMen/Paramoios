import { ParSnackbarProps } from 'components/styled/ParSnackbar';
import { RootState } from 'ducks/store';
import { shiftToast } from 'ducks/toast';
import { selectToast, selectToastCount } from 'ducks/toast/selectors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useToast = (id: string = 'main') => {
  const dispatch = useDispatch();

  const toast = useSelector((state: RootState) => selectToast(state, id));
  const toastCount = useSelector((state: RootState) =>
    selectToastCount(state, id),
  );

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
    dispatch(shiftToast(id));
    setIsOpen(false);
  };

  return {
    message: currentMessage,
    severity: currentMessageSeverity,
    open: isOpen,
    handleClose,
  } as const;
};
