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
      if (data.collected[pkg].error) {
        continue;
      }

      if (section in data.collected[pkg].data) {
        if (key in data.collected[pkg].data[section]) {
          return data.collected[pkg].data[section][key];
        }
      }
    }
  },
);
