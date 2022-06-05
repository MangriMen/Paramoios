import { Container, ContainerProps, styled } from '@mui/material';
import { FC } from 'react';

const ContainerStyled = styled(Container)(({ theme }) => ({
  border: '4px solid',
  borderColor: theme.palette.primary.main,
  backgroundColor: theme.palette.secondary.main,
  borderRadius: '4px',
}));

const ParBox: FC<ContainerProps> = ({ children, ...props }) => {
  return <ContainerStyled {...props}>{children}</ContainerStyled>;
};

export default ParBox;
