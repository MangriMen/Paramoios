import {
  Box,
  CircularProgress,
  Container,
  Typography,
  useTheme,
} from '@mui/material';
import Login from 'components/auth/Login';
import Register from 'components/auth/Register';
import { Information } from 'components/common/Information';
import { selectIsLoading } from 'ducks/auth/selectors';
import { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const AuthPage: FC = () => {
  const theme = useTheme();
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  const isLoading = useSelector(selectIsLoading);

  const [isLogin, setLogin] = useState(true);

  const changeComponentType = useCallback(() => {
    setLogin(!isLogin);
  }, [isLogin]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          padding: {
            xs: '0',
            md: '0 24px',
          },
          display: {
            xs: 'block',
            md: 'flex',
          },
          position: 'relative',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'white',
            position: {
              xs: 'static',
              md: 'sticky',
            },
            borderTopWidth: '0',
            borderBottomWidth: {
              xs: '6px',
              md: '0',
            },
            borderLeftWidth: {
              xs: '0',
              md: '10px',
            },
            borderRightWidth: {
              xs: '0',
              md: '10px',
            },
            borderStyle: 'solid',
            borderColor: theme.palette.secondary.main,
            boxShadow: '0 0 60px 2px #212121',
            backgroundColor: theme.palette.primary.main,
            top: '0px',
            height: {
              xs: '100%',
              md: '100vh',
            },
            padding: '2rem',
            flexBasis: '50%',
            boxSizing: 'border-box',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          <Typography
            textAlign="center"
            component="h1"
            sx={{
              fontSize: {
                xs: '3.5rem',
                sm: '5rem',
                md: '3.8rem',
                lg: '5rem',
                xl: '6rem',
              },
              lineHeight: 1,
            }}
          >
            {t('welcome')}
          </Typography>
          <Box
            flexGrow="1"
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="21rem"
          >
            {isLoading && <CircularProgress color="secondary" size="3rem" />}
            {!isLoading &&
              (isLogin ? (
                <Login changeFormType={changeComponentType} />
              ) : (
                <Register changeFormType={changeComponentType} />
              ))}
          </Box>
          <Box flexGrow="1" />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flexBasis: '50%',
            paddingLeft: {
              xs: '0',
              md: '80px',
            },
            paddingRight: {
              xs: '0',
              md: '40px',
              lg: '20px',
            },
          }}
        >
          <Box>
            <Information />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default AuthPage;
