import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'ducks/store';
import { themes } from 'themes';

export const selectThemeRaw = createSelector(
  [(state: RootState) => state.localSettings],
  (state) => state.theme,
);

export const selectTheme = createSelector(
  [(state: RootState) => state.localSettings],
  (state) => themes[state.theme],
);
