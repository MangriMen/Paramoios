import { Box, BoxProps, styled } from '@mui/material';

const BoxStyled = styled(Box)(({ theme }) => ({
  border: '4px solid',
  borderColor: theme.palette.primary.main,
  backgroundColor: theme.palette.secondary.main,
  borderRadius: '4px',
  padding: '1rem',
}));

function MainBoxStyled({ children, ...props }: BoxProps) {
  return <BoxStyled {...props}>{children}</BoxStyled>;
}

export default MainBoxStyled;
