import { Box, Container, Grid, Typography, useTheme } from '@mui/material';

function MainPageComponent() {
  const theme = useTheme();
  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: '1rem',
        backgroundColor: theme.palette.secondary.main,
        border: '4px solid',
        borderColor: theme.palette.primary.main,
        borderRadius: '4px',
        padding: '1rem',
        flexGrow: '1',
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={2}>
          <Box
            sx={{
              border: '4px solid',
              borderColor: theme.palette.primary.main,
              backgroundColor: theme.palette.secondary.main,
              borderRadius: '4px',
              height: '50%',
              padding: '2rem',
            }}
          ></Box>
        </Grid>
        <Grid item xs={10}>
          <Typography sx={{ fontSize: '5rem' }}>Hello World</Typography>
        </Grid>
        <Grid item xs={2}>
          <Box
            sx={{
              border: '4px solid',
              borderColor: theme.palette.primary.main,
              backgroundColor: theme.palette.secondary.main,
              borderRadius: '4px',
              padding: '2rem',
            }}
          ></Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MainPageComponent;
