import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Ability, InventoryItem } from 'components/charlist/Charlist';

import { CharacterSave, CharacterState } from './interfaces';

const initialState: CharacterState = {
  isLoading: false,
  error: '',
  packages: '',
  character: {
    abilities: {},
    equipment: {
      inventory: {},
      money: {},
    },
  },
};

export const characterSlice = createSlice({
  name: '@@character',
  initialState,
  reducers: {
    loadCharacterRequest: (state, _action: PayloadAction<CharacterSave>) => {
      state.isLoading = true;
      state.error = initialState.error;
    },
    loadCharacterSuccess: (state, action: PayloadAction<CharacterSave>) => {
      state.isLoading = initialState.isLoading;
      state.packages = action.payload.packages;
      state.character = action.payload.character;
    },
    loadCharacterFailed: (state, action: PayloadAction<string>) => {
      state.isLoading = initialState.isLoading;
      state.error = action.payload;
    },
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
    setAbility: (
      state,
      action: PayloadAction<{ name: string; value: Ability }>,
    ) => {
      state.character.abilities[action.payload.name] = action.payload.value;
    },
  },
});

export default characterSlice.reducer;
export const {
  loadCharacterRequest,
  loadCharacterSuccess,
  loadCharacterFailed,
  setCoin,
  setInventoryItem,
  setAbility,
} = characterSlice.actions;
