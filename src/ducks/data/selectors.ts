import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'ducks/store';

export const selectProperty = createSelector(
  [
    (state: RootState) => state.data,
    (_state: RootState, section: string) => section,
    (_state: RootState, _section: string, key: string) => key,
  ],
  (data, section, key) => {
    for (const pkg in data.collected) {
      if (section in data.collected[pkg]) {
        if (key in data.collected[pkg][section]) {
          return data.collected[pkg][section][key];
        }
      }
    }
  },
);
