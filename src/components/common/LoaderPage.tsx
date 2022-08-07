import { CircularProgress, Container } from '@mui/material';

export const LoaderPage = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <CircularProgress color="secondary" size="4rem" />
    </Container>
  );
};
