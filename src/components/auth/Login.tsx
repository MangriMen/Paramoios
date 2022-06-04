import { Box, Container, CssBaseline, Typography } from '@mui/material';
import ParLink from 'components/styled/ParLink';
import { authSlice } from 'ducks/auth';
import { Formik } from 'formik';
import { loginInitialValues, loginSchema } from 'helpers/auth';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import FormButton from './FormButton';
import FormField from './FormField';

function Login({ changeComponentType }: any) {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  const dispatch = useDispatch();

  const handlerSubmit = (values: typeof loginInitialValues) => {
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
          initialValues={loginInitialValues}
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
              <FormField fieldName="email" required autoFocus />
              <FormField
                type="password"
                fieldName="password"
                autoComplete={'current-password'}
                required
              />
              <FormButton type={'submit'} fullWidth>
                {t('signIn')}
              </FormButton>
            </Box>
          )}
        </Formik>
      </Box>
    </Container>
  );
}

export default Login;
