import { Avatar, Grid, Typography, useTheme } from '@mui/material';
import { Inventory } from 'components/common/Inventory/Inventory';
import { InventoryItem } from 'components/common/Inventory/InventoryItem';
import ParBox from 'components/styled/ParBox';
import ParContainer from 'components/styled/ParContainer';
import { FC } from 'react';

import RollDiceButton from './RollDiceButton';

const MainPage: FC = () => {
  const theme = useTheme();

  return (
    <ParContainer maxWidth="lg" sx={{ marginTop: '1rem', padding: '1rem' }}>
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
          />
        </Grid>
        <Grid item xs={10}>
          <Typography sx={{ fontSize: '5rem' }}>Hello World</Typography>
        </Grid>
      </Grid>
      {/* Grid container with character stats */}
      <Grid container justifyContent="space-between" mb="1rem">
        <ParBox padding="2rem"></ParBox>
        <ParBox padding="2rem"></ParBox>
        <ParBox padding="2rem"></ParBox>
        <RollDiceButton></RollDiceButton>
        <ParBox padding="2rem"></ParBox>
        <ParBox padding="2rem"></ParBox>
        <ParBox padding="2rem"></ParBox>
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
              <ParBox mb="1rem" padding="1rem">
                <Inventory rows={2} cols={4}>
                  <InventoryItem
                    data={{
                      name: 'Sword',
                      description: 'Stone sword',
                    }}
                    positionIndex={0}
                  />
                  <InventoryItem
                    data={{
                      name: 'Helmet',
                      description: 'Stone sword',
                    }}
                    positionIndex={1}
                  />
                  <InventoryItem
                    data={{
                      name: 'Rope',
                      description: 'Stone sword',
                    }}
                    positionIndex={2}
                  />
                  <InventoryItem
                    data={{
                      name: 'Stone',
                      description: 'Stone sword',
                    }}
                    positionIndex={23}
                  />
                </Inventory>
              </ParBox>
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
