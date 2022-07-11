import { useToast } from 'components/hooks/useToast';
import { ParSnackbar } from 'components/styled/ParSnackbar';
import { FC } from 'react';
import { Outlet } from 'react-router';

const PageWithMainToast: FC = () => {
  const { message, severity, open, handleClose } = useToast('main', false);

  return (
    <>
      <ParSnackbar
        closable
        autoHideDuration={4000}
        message={message}
        severity={severity}
        open={open}
        onClose={handleClose}
      />
      <Outlet />
    </>
  );
};

export default PageWithMainToast;
