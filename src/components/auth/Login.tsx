import { Box, Container, Typography } from '@mui/material';
import ParLink from 'components/styled/ParLink';
import { authSlice } from 'ducks/auth';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { loginSchema } from 'schemas/auth';

import FormButton from './FormButton';
import FormField from './FormField';
import { AuthFormProps, LoginValue } from './interfaces';

const initialValues: LoginValue = {
  email: '',
  password: '',
};

const Login: FC<AuthFormProps> = ({ isSubmitEnabled, changeFormType }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  const dispatch = useDispatch();

  const handlerSubmit = ({ email, password }: LoginValue) => {
    dispatch(authSlice.actions.login({ email, password }));
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
              />
              <FormField
                type="password"
                fieldName="password"
                autoComplete={'current-password'}
                required
                themeColor="secondary"
              />
              <FormButton type={'submit'} disabled={isSubmitEnabled} fullWidth>
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
