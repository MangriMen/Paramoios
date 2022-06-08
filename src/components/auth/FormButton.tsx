import { Button, ButtonProps } from '@mui/material';
import { FC } from 'react';

const AuthFormButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button color="secondary" variant="contained" fullWidth {...props}>
      {children}
    </Button>
  );
};

export default AuthFormButton;
