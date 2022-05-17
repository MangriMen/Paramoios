import {
  Avatar,
  Box,
  Container,
  Grid,
  Typography,
  useTheme,
} from '@mui/material';

import MainBoxStyled from './MainBoxStyled';

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
      }}
    >
      {/* Grid container header of charlist, contains avatar and character name */}
      <Grid
        container
        flexDirection="row"
        justifyContent="space-between"
        mb="1rem"
      >
        <Grid item xs={2}>
          <Avatar
            sx={{
              width: 'auto',
              height: 'auto',
              border: '4px solid',
              borderRadius: '4px',
              borderColor: theme.palette.primary.main,
              fontSize: '128px',
            }}
          ></Avatar>
        </Grid>
        <Grid item xs={10}>
          <Typography sx={{ fontSize: '5rem' }}>Hello World</Typography>
        </Grid>
      </Grid>
      {/* Grid container with character stats */}
      <Grid
        container
        flexDirection="row"
        justifyContent="space-between"
        mb="1rem"
      >
        {Array.from(Array(7)).map((_, index) => (
          <Grid item xs={1.5} key={index}>
            <MainBoxStyled />
          </Grid>
        ))}
      </Grid>
      <Grid container>
        {/* Grid container with character skills */}
        <Grid
          container
          flexDirection="row"
          columnSpacing={3}
          justifyContent="space-between"
          mb="1rem"
        >
          <Grid item xs={4}>
            <Grid container height="100%" flexDirection="column">
              {Array.from(Array(17)).map((_, index) => (
                <Grid item key={index}>
                  <Grid
                    container
                    flexDirection="row"
                    justifyContent="space-between"
                  >
                    {Array.from(Array(3)).map((_, index) => (
                      <MainBoxStyled key={index} mb="1rem" />
                    ))}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={4}>
            {/* Grid container with character skills */}
            <Grid
              container
              flexDirection="column"
              height="100%"
              justifyContent="space-between"
            >
              {/* Fight bonuses */}
              <MainBoxStyled mb="1rem" />
              {/* Attacks and spellcasting */}
              <MainBoxStyled mb="1rem" />
              {/* Equipment */}
              <MainBoxStyled mb="1rem" />
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid
              container
              flexDirection="column"
              height="100%"
              justifyContent="space-between"
            >
              {/* Health */}
              <MainBoxStyled />
              {/* Boards with traits, ideals, bonds, flaws */}
              {Array.from(Array(4)).map((_, index) => (
                <MainBoxStyled key={index} mb="1rem" />
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid container columnSpacing={3} flexDirection="row">
          <Grid item xs={4}>
            {/* Languages */}
            <MainBoxStyled />
          </Grid>
          <Grid item xs={8}>
            {/* Features and traits */}
            <MainBoxStyled />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default MainPageComponent;
