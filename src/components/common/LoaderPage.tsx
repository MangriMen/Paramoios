import { CircularProgress, Container } from '@mui/material';

export const LoaderPage = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: 'primary.main',
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
