import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'ducks/store';

export const selectCharacter = createSelector(
  [(state: RootState) => state.character.character],
  (character) => character,
);

export const selectIsLoading = createSelector(
  [(state: RootState) => state.character.isLoading],
  (isLoading) => isLoading,
);
