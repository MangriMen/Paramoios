import { Avatar, Box, Grid, Typography, useTheme } from '@mui/material';
import LiquidBar from 'components/charlist/LiquidBar';
import { FC } from 'react';

import ParBox from '../styled/ParBox';
import ParContainer from '../styled/ParContainer';

const MainPage: FC = () => {
  const theme = useTheme();

  return (
    <ParContainer maxWidth="lg" sx={{ marginTop: '1rem', padding: '1rem' }}>
      {/* Grid container header of charlist, contains avatar and character name */}
      <Box>
        <LiquidBar value={50} maxValue={100} />
      </Box>
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
          />
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
            <ParBox padding="1rem" />
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
                      <ParBox key={index} mb="1rem" padding="1rem" />
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
              <ParBox mb="1rem" padding="1rem" />
              {/* Attacks and spellcasting */}
              <ParBox mb="1rem" padding="1rem" />
              {/* Equipment */}
              <ParBox mb="1rem" padding="1rem" />
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
              <ParBox padding="1rem" />
              {/* Boards with traits, ideals, bonds, flaws */}
              {Array.from(Array(4)).map((_, index) => (
                <ParBox key={index} mb="1rem" padding="1rem" />
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid container columnSpacing={3} flexDirection="row">
          <Grid item xs={4}>
            {/* Languages */}
            <ParBox padding="1rem" />
          </Grid>
          <Grid item xs={8}>
            {/* Features and traits */}
            <ParBox padding="1rem" />
          </Grid>
        </Grid>
      </Grid>
    </ParContainer>
  );
};

export default MainPage;
