import BrushIcon from '@mui/icons-material/Brush';
import InfoIcon from '@mui/icons-material/Info';
import LockIcon from '@mui/icons-material/Lock';
import { Box, Button, ButtonProps } from '@mui/material';
import ParContainer from 'components/styled/ParContainer';
import { InformationView } from 'components/user/UserSettings/InformationView';
import { PasswordView } from 'components/user/UserSettings/PasswordView';
import { PersonalizationView } from 'components/user/UserSettings/PersonalizationView';
import { FC, ReactNode, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Routes, useNavigate, useParams } from 'react-router';

export const PageButton: FC<
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

const iconStyle = { marginRight: '0.2rem' };

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
    navigate('information');
  };

  const toPasswordPage = () => {
    navigate('password');
  };

  const toPersonalizationPage = () => {
    navigate('personalization');
  };

  return (
    <ParContainer
      maxWidth="lg"
      sx={{
        mt: '1rem',
        padding: '1.5rem',
        height: { xs: 'auto', md: 'calc(100vh - 3rem)' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: { xs: 'wrap', md: 'nowrap', height: '100%' },
        }}
      >
        <Box
          sx={{
            minWidth: { xs: 'none', md: '14rem' },
            width: { xs: '100%', md: 'auto' },
            marginBottom: { xs: '1rem', md: '0' },
            display: 'flex',
            flexDirection: 'column',
            margin: '0 1.5rem 0 0',
          }}
        >
          <PageButton
            active={page === 'information'}
            onClick={toInformationPage}
            icon={<InfoIcon sx={iconStyle} />}
            title={t('information')}
          />
          <PageButton
            active={page === 'password'}
            onClick={toPasswordPage}
            icon={<LockIcon sx={iconStyle} />}
            title={t('password')}
          />
          <PageButton
            active={page === 'personalization'}
            onClick={toPersonalizationPage}
            icon={<BrushIcon sx={iconStyle} />}
            title={t('personalization')}
          />
        </Box>
        <Box
          sx={{
            width: '100%',
            overflow: 'scroll',
          }}
        >
          <Routes>
            <Route path="information" element={<InformationView />} />
            <Route path="password" element={<PasswordView />} />
            <Route path="personalization" element={<PersonalizationView />} />
          </Routes>
        </Box>
      </Box>
    </ParContainer>
  );
};
