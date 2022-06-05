import { Box, Container, CssBaseline, Typography } from '@mui/material';
import ParLink from 'components/styled/ParLink';
import { authSlice } from 'ducks/auth';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { loginSchema } from 'schemas/auth';

import AuthFormButton from './AuthFormButton';
import AuthFormField from './AuthFormField';

interface ILoginValues {
  email: string;
  password: string;
}

function LoginComponent({ changeComponentType }: any) {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  const dispatch = useDispatch();

  const initialValues: ILoginValues = {
    email: '',
    password: '',
  };

  const handlerSubmit = (values: ILoginValues) => {
    dispatch(
      authSlice.actions.login({
        email: values.email,
        password: values.password,
      }),
    );
  };

  return (
    <Container component={'main'} maxWidth={'xs'}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          component={'h2'}
          variant={'h2'}
          fontWeight="bold"
          sx={{ fontSize: { xs: '3rem' } }}
        >
          {t('authorize')}
        </Typography>
        <ParLink component="button" onClick={changeComponentType}>
          {t('orRegister')}
        </ParLink>
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={handlerSubmit}
          validateOnBlur
        >
          {({ handleSubmit }) => (
            <Box
              component={'form'}
              onSubmit={handleSubmit}
              sx={{ maxWidth: '21rem' }}
            >
              <AuthFormField fieldName="email" required autoFocus />
              <AuthFormField
                type="password"
                fieldName="password"
                autoComplete={'current-password'}
                required
              />
              <AuthFormButton type={'submit'} fullWidth>
                {t('signIn')}
              </AuthFormButton>
            </Box>
          )}
        </Formik>
      </Box>
    </Container>
  );
}

export default LoginComponent;
