import { useToast } from 'components/hooks/useToast';
import { ParSnackbar } from 'components/styled/ParSnackbar';
import { FC } from 'react';
import { Outlet } from 'react-router';

const PageWithMainToast: FC = () => {
  const { message, severity, open, onClose } = useToast('main', false);

  return (
    <>
      <ParSnackbar
        closable
        key={message?.toString()}
        autoHideDuration={4000}
        message={message}
        severity={severity}
        open={open}
        onClose={onClose}
      />
      <Outlet />
    </>
  );
};

export default PageWithMainToast;
