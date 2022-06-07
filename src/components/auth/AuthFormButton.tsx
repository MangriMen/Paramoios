import { Button, ButtonProps, styled } from '@mui/material';
import { FC } from 'react';

const ButtonStyled = styled(Button)(() => ({
  marginTop: '1rem',
  fontSize: '1.1rem',
}));

const AuthFormButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <ButtonStyled color="secondary" variant="contained" fullWidth {...props}>
      {children}
    </ButtonStyled>
  );
};

export default AuthFormButton;
