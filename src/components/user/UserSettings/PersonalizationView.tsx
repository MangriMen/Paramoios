import {
  Box,
  Theme,
  ToggleButton,
  ToggleButtonGroup,
  styled,
} from '@mui/material';
import { SettingSection } from 'components/user/SettingSection';
import { setSetting } from 'ducks/localSettings';
import { selectThemeRaw } from 'ducks/localSettings/selectors';
import { FC, MouseEvent, ReactNode, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { themes } from 'themes';

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

  const [themeButtons, setThemeButtons] = useState<ReactNode>();

  const theme = useSelector(selectThemeRaw);

  const handleThemeChange = (
    _event: MouseEvent<HTMLElement>,
    newTheme: string,
  ) => {
    if (newTheme === null) {
      return;
    }
    dispatch(setSetting({ key: 'theme', value: newTheme }));
  };

  useEffect(() => {
    setThemeButtons(
      Object.keys(themes).map((key) => (
        <ToggleButtonStyled value={key} aria-label={t(key)}>
          <ThemeIcon theme={themes[key]} />
        </ToggleButtonStyled>
      )),
    );
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <SettingSection title={t('themeSettings')}>
        <ToggleButtonGroupStyled
          exclusive
          size="small"
          value={theme}
          onChange={handleThemeChange}
          aria-label="theme select"
        >
          {themeButtons}
        </ToggleButtonGroupStyled>
      </SettingSection>
    </Box>
  );
};
