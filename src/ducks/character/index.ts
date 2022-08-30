import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { InventoryItem } from 'components/charlist/Charlist';

import { CharacterState } from './interfaces';

const initialState: CharacterState = {
  error: '',
  character: {
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
  },
};

export const characterSlice = createSlice({
  name: '@@character',
  initialState,
  reducers: {
    setCoin: (
      state,
      action: PayloadAction<{ name: string; value: number }>,
    ) => {
      state.character.equipment.money[action.payload.name] =
        action.payload.value;
    },
    setInventoryItem: (
      state,
      action: PayloadAction<{ index: number; value: InventoryItem | null }>,
    ) => {
      if (action.payload.value === undefined) {
        return;
      }

      if (action.payload.value === null) {
        delete state.character.equipment.inventory[action.payload.index];
      } else {
        state.character.equipment.inventory[action.payload.index] =
          action.payload.value;
      }
    },
  },
});

export default characterSlice.reducer;
export const { setCoin, setInventoryItem } = characterSlice.actions;
