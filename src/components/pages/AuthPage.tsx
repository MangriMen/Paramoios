import { Box, CircularProgress, Typography } from '@mui/material';
import Login from 'components/auth/Login';
import Register from 'components/auth/Register';
import { Information } from 'components/common/Information';
import { LeftPane } from 'components/common/WelcomePage/LeftPane';
import { RightPane } from 'components/common/WelcomePage/RightPane';
import { WelcomePage } from 'components/common/WelcomePage/WelcomePage';
import { selectIsLoading } from 'ducks/auth/selectors';
import { FC, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const AuthPage: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  const isLoading = useSelector(selectIsLoading);

  const [isLogin, setLogin] = useState(true);

  const changeComponentType = useCallback(() => {
    setLogin(!isLogin);
  }, [isLogin]);

  return (
    <WelcomePage>
      <LeftPane>
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
      </LeftPane>
      <RightPane>
        <Information />
      </RightPane>
    </WelcomePage>
  );
};

export default AuthPage;
