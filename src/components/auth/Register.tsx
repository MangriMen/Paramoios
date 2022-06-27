import { Box, Container, Typography } from '@mui/material';
import ParLink from 'components/styled/ParLink';
import { registerRequest } from 'ducks/auth';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { registerSchema } from 'schemas/auth';

import FormButton from './FormButton';
import FormField from './FormField';
import { AuthFormProps, RegisterValue } from './interfaces';

const initialValues: RegisterValue = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Register: FC<AuthFormProps> = ({ isSubmitEnabled, changeFormType }) => {
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  const dispatch = useDispatch();

  const handlerSubmit = ({ username, email, password }: RegisterValue) => {
    dispatch(registerRequest({ username, email, password }));
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          component="h2"
          variant="h2"
          fontWeight="bold"
          sx={{ fontSize: { xs: '3rem' } }}
        >
          {t('register')}
        </Typography>
        <ParLink component="button" onClick={changeFormType}>
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
                margin="normal"
                fullWidth
              />
              <FormField
                fieldName="email"
                required
                themeColor="secondary"
                margin="normal"
                fullWidth
              />
              <FormField
                type="password"
                fieldName="password"
                required
                themeColor="secondary"
                margin="normal"
                fullWidth
              />
              <FormField
                type="password"
                fieldName="confirmPassword"
                required
                themeColor="secondary"
                margin="normal"
                fullWidth
              />

              <FormButton
                type="submit"
                color="secondary"
                fullWidth
                sx={{ mt: '1rem' }}
              >
                {t('signUp')}
              </FormButton>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Container>
  );
};

export default Register;
