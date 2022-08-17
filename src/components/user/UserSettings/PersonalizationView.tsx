import {
  Box,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  styled,
} from '@mui/material';
import ParDivider from 'components/styled/ParDivider';
import { setTheme } from 'ducks/localSettings';
import { selectThemeRaw } from 'ducks/localSettings/selectors';
import { FC, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import bnwTheme from 'themes/bnw';
import defaultTheme from 'themes/default';

export const ThemeIcon: FC<{
  theme: Theme | any;
}> = ({ theme }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '3rem',
        aspectRatio: '1/1',
        backgroundColor: '#212121',
        borderWidth: '4px',
        borderStyle: 'solid',
        borderColor: '#212121',
        borderRadius: '50%',
        overflow: 'hidden',
        transform: 'rotate(45deg)',
      }}
    >
      <Box
        sx={{
          flexBasis: '50%',
          backgroundColor: theme.palette.primary.main,
        }}
      />
      <Box
        sx={{
          flexBasis: '50%',
          backgroundColor: theme.palette.secondary.main,
        }}
      />
    </Box>
  );
};

const ToggleButtonGroupStyled = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    marginRight: '0.5rem',
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: '50%',
    },
    '&:first-of-type': {
      borderRadius: '50%',
    },
  },
}));

const ToggleButtonStyled = styled(ToggleButton)(({ theme }) => ({
  '&.Mui-selected, &.Mui-selected:hover': {
    backgroundColor: '#2979FF',
  },
}));

export const PersonalizationView = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation('translation', { keyPrefix: 'theme' });

  const theme = useSelector(selectThemeRaw);

  const handleThemeChange = (
    _event: MouseEvent<HTMLElement>,
    newTheme: string,
  ) => {
    if (newTheme === null) {
      return;
    }

    dispatch(setTheme(newTheme));
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Typography variant="h3" color="primary.dark">
          {t('themeSettings')}
        </Typography>
        <ParDivider sx={{ width: '100%', marginBottom: '1rem' }} />
        <ToggleButtonGroupStyled
          exclusive
          size="small"
          value={theme}
          onChange={handleThemeChange}
          aria-label="theme select"
        >
          <ToggleButtonStyled value={'default'} aria-label={t('default')}>
            <ThemeIcon theme={defaultTheme} />
          </ToggleButtonStyled>
          <ToggleButtonStyled value={'bnw'} aria-label={t('bnw')}>
            <ThemeIcon theme={bnwTheme} />
          </ToggleButtonStyled>
        </ToggleButtonGroupStyled>
      </Box>
    </Box>
  );
};
