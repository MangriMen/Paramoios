import { Button, ButtonProps, styled } from '@mui/material';

const ButtonStyled = styled(Button)(({ theme }) => ({
  marginTop: '1rem',
  marginBottom: '1.5rem',
  fontSize: '1.1rem',
}));

function AuthFormButton({ children, ...props }: ButtonProps) {
  return (
    <ButtonStyled color="secondary" variant="contained" fullWidth {...props}>
      {children}
    </ButtonStyled>
  );
}

export default AuthFormButton;
