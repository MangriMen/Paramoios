import { createTheme } from '@mui/material';
import { deepmerge } from '@mui/utils';
import { COMPONENTS_DEFAULT_OPTIONS } from 'consts/componentDefaultOptions';

const defaultTheme = createTheme(
  deepmerge(
    {
      typography: {
        fontFamily: 'Eberron',
      },
      palette: {
        primary: {
          main: '#681e22',
        },
        secondary: {
          main: '#e9c996',
        },
      },
    },
    COMPONENTS_DEFAULT_OPTIONS,
  ),
);

export default defaultTheme;
