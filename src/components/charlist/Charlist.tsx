import { Grid, Typography } from '@mui/material';
import ParAvatar from 'components/styled/ParAvatar';
import ParBox from 'components/styled/ParBox';
import ParContainer from 'components/styled/ParContainer';
import i18n from 'configs/i18next';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Abilities } from './Abilities';
import LiquidBar from './LiquidBar';
import RollDiceButton from './RollDiceButton';

export interface Ability {
  enabled: boolean;
  value: number;
  override: number;
}

const Charlist: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'charlist' });

  const [character, setCharacter] = useState<{ [x: string]: any }>({
    abilities: {
      acrobatics: { enabled: false, value: 0, override: 0 },
      animalHandling: { enabled: false, value: 0, override: 0 },
      arcana: { enabled: false, value: 0, override: 0 },
      athletics: { enabled: false, value: 0, override: 0 },
      deception: { enabled: false, value: 0, override: 0 },
      history: { enabled: false, value: 0, override: 0 },
      insight: { enabled: false, value: 0, override: 0 },
      intimidation: { enabled: false, value: 0, override: 0 },
      investigation: { enabled: false, value: 0, override: 0 },
      medicine: { enabled: false, value: 0, override: 0 },
      nature: { enabled: false, value: 0, override: 0 },
      perception: { enabled: false, value: 0, override: 0 },
      perfomance: { enabled: false, value: 0, override: 0 },
      persuasion: { enabled: false, value: 0, override: 0 },
      religion: { enabled: false, value: 0, override: 0 },
      sleightOfHand: { enabled: false, value: 0, override: 0 },
      stealth: { enabled: false, value: 0, override: 0 },
      survival: { enabled: false, value: 0, override: 0 },
    },
  });

  const setAbilities = (newAbilities: { [x: string]: Ability }) => {
    setCharacter({ ...character, abilities: newAbilities });
  };

  return (
    <ParContainer maxWidth="lg" sx={{ marginTop: '1rem', padding: '1rem' }}>
      <button
        onClick={() => {
          i18n.removeResourceBundle('ru', 'data');
        }}
      ></button>
      {/* Grid container header of charlist, contains avatar and character name */}
      <Grid
        container
        flexDirection="row"
        justifyContent="space-between"
        mb="1rem"
      >
        <Grid item xs={2}>
          <ParAvatar
            sx={{
              width: 'auto',
              height: 'auto',
              aspectRatio: '1/1',
              borderWidth: '2px',
              borderStyle: 'solid',
              borderRadius: '4px',
              fontSize: '128px',
              borderColor: 'primary.main',
            }}
          />
          <LiquidBar
            borderRadius="4px"
            border="4px solid"
            height="1.8rem"
            fontSize="1.2rem"
            borderColor="primary.main"
            bgcolor="green"
            value={50}
            maxValue={100}
          />
        </Grid>
        <Grid item xs={10}>
          <Typography sx={{ fontSize: '5rem' }}>Hello World</Typography>
        </Grid>
      </Grid>
      {/* Grid container with character stats */}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        mb="1rem"
      >
        <ParBox padding="2rem"></ParBox>
        <ParBox padding="2rem"></ParBox>
        <ParBox padding="2rem"></ParBox>
        <RollDiceButton sx={{ width: '4.5rem' }}></RollDiceButton>
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
              <Abilities items={character.abilities} setItems={setAbilities} />
              {/* {Array.from(Array(17)).map((_, index) => (
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
              ))} */}
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
              <ParBox
                title={t('attacksAndSpellcasting')}
                mb="1rem"
                padding="1rem"
              />
              {/* Equipment */}
              <ParBox title={t('equipment')} mb="1rem" padding="1rem" />
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
              <ParBox title={t('traits')} mb="1rem" padding="1rem" />
              <ParBox title={t('ideals')} mb="1rem" padding="1rem" />
              <ParBox title={t('bonds')} mb="1rem" padding="1rem" />
              <ParBox title={t('flaws')} mb="1rem" padding="1rem" />
            </Grid>
          </Grid>
        </Grid>
        <Grid container columnSpacing={3} flexDirection="row">
          <Grid item xs={4}>
            {/* Languages */}
            <ParBox
              title={t('otherProficienciesAndLanguages')}
              padding="1rem"
            />
          </Grid>
          <Grid item xs={8}>
            {/* Features and traits */}
            <ParBox title={t('featureAndTraits')} padding="1rem" />
          </Grid>
        </Grid>
      </Grid>
    </ParContainer>
  );
};

export default Charlist;
