import { Container, ContainerProps, styled } from '@mui/material';

const ContainerStyled = styled(Container)(({ theme }) => ({
  border: '4px solid',
  borderColor: theme.palette.primary.main,
  backgroundColor: theme.palette.secondary.main,
  borderRadius: '4px',
}));

function ParBox({ children, ...props }: ContainerProps) {
  return <ContainerStyled {...props}>{children}</ContainerStyled>;
}

export default ParBox;
