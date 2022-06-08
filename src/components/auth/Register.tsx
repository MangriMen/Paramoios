import { Box, Container, CssBaseline, Typography } from '@mui/material';
import ParLink from 'components/styled/ParLink';
import { authSlice } from 'ducks/auth';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { registerSchema } from 'schemas/auth';

import FormButton from './FormButton';
import FormField from './FormField';

interface RegisterValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: FC<{ changeComponentType: () => void }> = ({
  changeComponentType,
}) => {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  const dispatch = useDispatch();

  const initialValues: RegisterValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handlerSubmit = ({ username, email, password }: RegisterValues) => {
    dispatch(authSlice.actions.register({ username, email, password }));
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
          initialValues={initialValues}
          validationSchema={registerSchema}
          onSubmit={handlerSubmit}
          validateOnBlur
        >
          <Form>
            <Box sx={{ maxWidth: '21rem' }}>
              <FormField
                fieldName="username"
                required
                autoFocus
                themeColor="secondary"
              />
              <FormField fieldName="email" required themeColor="secondary" />
              <FormField
                type="password"
                fieldName="password"
                required
                themeColor="secondary"
              />
              <FormField
                type="password"
                fieldName="confirmPassword"
                required
                themeColor="secondary"
              />
              <FormButton type="submit">{t('signUp')}</FormButton>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};

export default Register;
