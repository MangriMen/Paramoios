import { Theme, ThemeOptions, createTheme } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { COMPONENTS_DEFAULT_OPTIONS } from 'consts/componentDefaultOptions';

import bnwThemeOptions from './bnw';
import defaultThemeOptions from './default';

function createWithDefaultOptions(themeOptions: ThemeOptions) {
  return createTheme(deepmerge(themeOptions, COMPONENTS_DEFAULT_OPTIONS));
}

export interface Themes {
  [x: string]: Theme;
}

export const themes: Themes = {
  default: createWithDefaultOptions(defaultThemeOptions),
  bnw: createWithDefaultOptions(bnwThemeOptions),
};
