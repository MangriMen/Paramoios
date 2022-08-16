import { Theme } from '@mui/material';

import bnwTheme from './bnw';
import defaultTheme from './default';

export * from './default';
export * from './bnw';

export interface Themes {
  [x: string]: Theme;
}

export const themes: Themes = {
  default: defaultTheme,
  bnw: bnwTheme,
};
