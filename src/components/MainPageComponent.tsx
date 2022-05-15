import {
  Avatar,
  Box,
  Container,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';

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
        flexGrow: '1',
      }}
    >
      <Grid
        container
        spacing={3}
        flexDirection="row"
        justifyContent="space-between"
        padding="1rem 0"
        alignItems="stretch"
      >
        <Grid item xs={2}>
          <Avatar
            sx={{
              border: '4px solid',
              borderColor: theme.palette.primary.main,
              backgroundColor: theme.palette.secondary.main,
              borderRadius: '4px',
              padding: '3rem',
            }}
          ></Avatar>
        </Grid>
        <Grid item xs={10}>
          <Typography sx={{ fontSize: '5rem' }}>Hello World</Typography>
        </Grid>
        {Array.from(Array(7)).map((_, index) => (
          <Grid item xs={1.5} key={index}>
            <Box
              sx={{
                border: '4px solid',
                borderColor: theme.palette.primary.main,
                backgroundColor: theme.palette.secondary.main,
                borderRadius: '4px',
                padding: '2rem',
              }}
            >
              {index}
            </Box>
          </Grid>
        ))}
        {Array.from(Array(3)).map((_, index) => (
          <Grid item xs={4} key={index}>
            <Box
              sx={{
                border: '4px solid',
                borderColor: theme.palette.primary.main,
                backgroundColor: theme.palette.secondary.main,
                borderRadius: '4px',
                padding: '2rem',
              }}
            >
              {index}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default MainPageComponent;
