import { Grid, Typography } from '@mui/material';
import { InventoryCard } from 'components/charlist/Inventory/InventoryCard';
import ParAvatar from 'components/styled/ParAvatar';
import ParBox from 'components/styled/ParBox';
import ParContainer from 'components/styled/ParContainer';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import LiquidBar from './LiquidBar';
import RollDiceButton from './RollDiceButton';

export interface Ability {
  enabled: boolean;
  value: number;
  override: number;
}

export interface InventoryItem {
  name: string;
  description: string;
}

export interface Inventory {
  [x: number]: InventoryItem;
}

export interface Money {
  copper: number;
  silver: number;
  electrum: number;
  gold: number;
  platinum: number;
  [x: string]: number;
}

export interface Equipment {
  inventory: Inventory;
  money: Money;
}

export interface Character {
  abilities: { [x: string]: Ability };
  equipment: Equipment;
}

const characterInitialState: Character = {
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
  equipment: {
    inventory: {
      0: {
        name: 'Helmet',
        description: 'Stone sword',
      },
      2: {
        name: 'Hummer',
        description: 'Stone hummer',
      },
    },
    money: {
      copper: 0,
      silver: 0,
      electrum: 0,
      gold: 0,
      platinum: 0,
    },
  },
};

const Charlist: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'charlist' });

  const [character, setCharacter] = useState<Character>(characterInitialState);

  const setEquipment = (newEquipment: Character['equipment']) => {
    setCharacter({ ...character, equipment: newEquipment });
  };

  const setInventory = (newInventory: Character['equipment']['inventory']) => {
    setEquipment({ ...character.equipment, inventory: newInventory });
  };

  // console.log(character.equipment.inventory);

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
              <ParBox
                title={t('attacksAndSpellcasting')}
                mb="1rem"
                padding="1rem"
              />
              {/* Equipment */}
              <ParBox mb="1rem" padding="1rem">
                <InventoryCard
                  items={character.equipment.inventory}
                  setItems={setInventory}
                  rows={2}
                  cols={4}
                />
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
