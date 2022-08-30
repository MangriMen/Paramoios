import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'ducks/store';

export const selectCharacter = createSelector(
  [(state: RootState) => state.character.character],
  (character) => character,
);
