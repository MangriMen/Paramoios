import { Button, ButtonProps } from '@mui/material';
import { FC } from 'react';

const AuthFormButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button color="primary" variant="contained" {...props}>
      {children}
    </Button>
  );
};

export default AuthFormButton;
