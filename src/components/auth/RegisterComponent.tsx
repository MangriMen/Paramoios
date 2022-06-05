import { Box, Container, CssBaseline, Typography } from '@mui/material';
import ParLink from 'components/styled/ParLink';
import { authSlice } from 'ducks/auth';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { registerSchema } from 'schemas/auth';

import AuthFormButton from './AuthFormButton';
import AuthFormField from './AuthFormField';

interface IRegisterValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function RegisterComponent({ changeComponentType }: any) {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  const dispatch = useDispatch();

  const initialValues: IRegisterValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const handlerSubmit = (values: IRegisterValues) => {
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
          initialValues={initialValues}
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
              <AuthFormField type="password" fieldName="password" required />
              <AuthFormField
                type="password"
                fieldName="confirmPassword"
                required
              />
              <AuthFormButton type="submit">{t('signUp')}</AuthFormButton>
            </Box>
          )}
        </Formik>
      </Box>
    </Container>
  );
}

export default RegisterComponent;
