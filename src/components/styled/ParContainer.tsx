import { Container, styled } from '@mui/material';

const ParContainer = styled(Container)(({ theme }) => ({
  border: '4px solid',
  borderColor: theme.palette.primary.main,
  backgroundColor: theme.palette.secondary.main,
  borderRadius: '4px',
}));

export default ParContainer;
