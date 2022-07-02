import { Box, Container, Typography } from '@mui/material';
import ParLink from 'components/styled/ParLink';
import { loginRequest } from 'ducks/auth';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { loginSchema } from 'schemas/auth';

import FormButton from './FormButton';
import FormField from './FormField';
import { AuthFormProps, LoginValues } from './interfaces';

const initialValues: LoginValues = {
  email: '',
  password: '',
};

const Login: FC<AuthFormProps> = ({ changeFormType }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  const dispatch = useDispatch();

  const handlerSubmit = ({ email, password }: LoginValues) => {
    dispatch(loginRequest({ email, password }));
  };

  return (
    <Container component={'main'} maxWidth={'xs'}>
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
        <ParLink component="button" onClick={changeFormType}>
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
