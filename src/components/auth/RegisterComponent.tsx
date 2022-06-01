import { Box, Container, CssBaseline, Typography } from '@mui/material';
import ParLink from 'components/styled/ParLink';
import { authSlice } from 'ducks/auth';
import { Formik } from 'formik';
import { registerInitialValues, registerSchema } from 'helpers/auth';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import AuthFormButton from './AuthFormButton';
import AuthFormField from './AuthFormField';

function RegisterComponent({ changeComponentType }: any) {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  const dispatch = useDispatch();

  const handlerSubmit = (values: typeof registerInitialValues) => {
    dispatch(
      authSlice.actions.register({
        username: values.username,
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
          {t('register')}
        </Typography>
        <ParLink component="button" onClick={changeComponentType}>
          {t('orLogin')}
        </ParLink>
        <Formik
          initialValues={registerInitialValues}
          validationSchema={registerSchema}
          onSubmit={handlerSubmit}
          validateOnBlur
        >
          {({ handleSubmit }) => (
            <Box
              component={'form'}
              onSubmit={handleSubmit}
              sx={{ maxWidth: '21rem' }}
            >
              <AuthFormField fieldName="username" required autoFocus />
              <AuthFormField fieldName="email" required />
              <AuthFormField fieldName="password" required />
              <AuthFormField fieldName="confirmPassword" required />
              <AuthFormButton type="submit">{t('signUp')}</AuthFormButton>
            </Box>
          )}
        </Formik>
      </Box>
    </Container>
  );
}

export default RegisterComponent;
