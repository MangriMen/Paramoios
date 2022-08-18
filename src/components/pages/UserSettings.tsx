import BrushIcon from '@mui/icons-material/Brush';
import InfoIcon from '@mui/icons-material/Info';
import LockIcon from '@mui/icons-material/Lock';
import { Box, Button, ButtonProps } from '@mui/material';
import ParContainer from 'components/styled/ParContainer';
import { InformationView } from 'components/user/UserSettings/InformationView';
import { PasswordView } from 'components/user/UserSettings/PasswordView';
import { PersonalizationView } from 'components/user/UserSettings/PersonalizationView';
import { ROUTE_SETTINGS } from 'consts';
import { FC, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Routes, useNavigate, useParams } from 'react-router';

export const ViewButton: FC<
  ButtonProps & { active?: boolean; icon?: ReactNode; title?: ReactNode }
> = ({ active, icon, title, children, sx, ...props }) => {
  return (
    <Button
      variant={active ? 'contained' : 'text'}
      color="primary"
      sx={{
        justifyContent: 'flex-start',
        ...sx,
      }}
      {...props}
    >
      {!children && icon}
      {!children && title}
      {children}
    </Button>
  );
};

const viewButtonIconStyle = { marginRight: '0.2rem' };

export const UserSettings: FC = () => {
  const navigate = useNavigate();

  const { page } = useParams();

  useEffect(() => {
    if (page === undefined) {
      navigate('information');
    }
  }, [navigate, page]);

  const { t } = useTranslation('translation', { keyPrefix: 'userSettings' });

  const toInformationPage = () => {
    navigate(ROUTE_SETTINGS.INFORMATION);
  };

  const toPasswordPage = () => {
    navigate(ROUTE_SETTINGS.PASSWORD);
  };

  const toPersonalizationPage = () => {
    navigate(ROUTE_SETTINGS.PERSONALIZATION);
  };

  return (
    <ParContainer
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        marginTop: '1rem',
        padding: '1.5rem',
        minHeight: 'calc(100vh - 3rem)',
      }}
    >
      <Box
        sx={{
          minWidth: { xs: 'none', md: '14rem' },
          width: { xs: '100%', md: 'auto' },
          marginBottom: { xs: '1rem', md: '0' },
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          margin: '0 1.5rem 0 0',
        }}
      >
        <ViewButton
          active={page === ROUTE_SETTINGS.INFORMATION}
          onClick={toInformationPage}
          icon={<InfoIcon sx={viewButtonIconStyle} />}
          title={t('information')}
        />
        <ViewButton
          active={page === ROUTE_SETTINGS.PASSWORD}
          onClick={toPasswordPage}
          icon={<LockIcon sx={viewButtonIconStyle} />}
          title={t('password')}
        />
        <ViewButton
          active={page === ROUTE_SETTINGS.PERSONALIZATION}
          onClick={toPersonalizationPage}
          icon={<BrushIcon sx={viewButtonIconStyle} />}
          title={t('personalization')}
        />
      </Box>
      <Box
        sx={{
          width: '100%',
          height: { md: 'calc(100vh - 6.5rem)' },
          overflowY: { md: 'auto' },
          overflowX: 'hidden',
        }}
      >
        <Routes>
          <Route
            path={ROUTE_SETTINGS.INFORMATION}
            element={<InformationView />}
          />
          <Route path={ROUTE_SETTINGS.PASSWORD} element={<PasswordView />} />
          <Route
            path={ROUTE_SETTINGS.PERSONALIZATION}
            element={<PersonalizationView />}
          />
        </Routes>
      </Box>
    </ParContainer>
  );
};
