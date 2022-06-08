import { Box, Container, CssBaseline, Typography } from '@mui/material';
import ParLink from 'components/styled/ParLink';
import { authSlice } from 'ducks/auth';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { loginSchema } from 'schemas/auth';

import FormButton from './FormButton';
import FormField from './FormField';

interface LoginValues {
  email: string;
  password: string;
}

const Login: FC<{ changeComponentType: () => void }> = ({
  changeComponentType,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  const dispatch = useDispatch();

  const initialValues: LoginValues = {
    email: '',
    password: '',
  };

  const handlerSubmit = ({ email, password }: LoginValues) => {
    dispatch(authSlice.actions.login({ email, password }));
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
          <Form>
            <Box sx={{ maxWidth: '21rem' }}>
              <FormField
                fieldName="email"
                required
                autoFocus
                themeColor="secondary"
                fullWidth
                margin="normal"
              />
              <FormField
                type="password"
                fieldName="password"
                autoComplete={'current-password'}
                required
                themeColor="secondary"
                fullWidth
                margin="normal"
              />
              <FormButton
                type={'submit'}
                fullWidth
                color="secondary"
                sx={{ mt: '1rem' }}
              >
                {t('signIn')}
              </FormButton>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};

export default Login;
