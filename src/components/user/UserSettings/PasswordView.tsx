import { Box, Typography } from '@mui/material';
import FormButton from 'components/auth/FormButton';
import FormField from 'components/auth/FormField';
import ParDivider from 'components/styled/ParDivider';
import { PasswordValue } from 'components/user/interfaces';
import { updatePassword } from 'ducks/userSettings';
import { Form, Formik } from 'formik';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { passwordSettingsSchema } from 'schemas/userSettings';

const passwordSettingsInitialValue: PasswordValue = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export const PasswordView: FC = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation('translation', { keyPrefix: 'userSettings' });

  const [disablePasswordButton, setDisablePasswordButton] =
    useState<boolean>(false);

  const submitPasswordHandler = ({ newPassword }: PasswordValue) => {
    setDisablePasswordButton(!disablePasswordButton);
    dispatch(updatePassword(newPassword));
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDisablePasswordButton(false);
    }, 3000);

    return () => {
      clearTimeout(timerId);
    };
  }, [disablePasswordButton]);

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: { md: 'flex-start' },
        }}
      >
        <Typography variant="h3" color="primary.dark">
          {t('changePassword')}
        </Typography>
        <ParDivider sx={{ width: '100%', marginBottom: '1rem' }} />
        <Formik
          initialValues={passwordSettingsInitialValue}
          validationSchema={passwordSettingsSchema}
          onSubmit={submitPasswordHandler}
          validateOnBlur
        >
          <Form>
            <Box display="grid" rowGap="1.5rem" justifyItems="center">
              <FormField type="password" fieldName="currentPassword" />
              <FormField type="password" fieldName="newPassword" />
              <FormField type="password" fieldName="confirmPassword" />
              <FormButton type="submit" disabled={disablePasswordButton}>
                {t('changePassword')}
              </FormButton>
            </Box>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};
