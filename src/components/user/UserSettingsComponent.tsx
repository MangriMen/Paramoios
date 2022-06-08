import { Box, Button, Typography, styled } from '@mui/material';
import FormButton from 'components/auth/FormButton';
import FormField from 'components/auth/FormField';
import ParAvatar from 'components/styled/ParAvatar';
import ParContainer from 'components/styled/ParContainer';
import { auth } from 'configs/firebase';
import { updateEmail, updatePassword, updateUsername } from 'ducks/user';
import { Form, Formik, FormikValues } from 'formik';
import { userInfo } from 'mocks/mockUserInfo';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import {
  emailSettingsSchema,
  passwordSettingsSchema,
  usernameSettingsSchema,
} from 'schemas/userSettings';

import {
  EmailValue,
  PasswordValue,
  UsernameValue,
  activeButtons,
} from './interfaces';

const usernameSettingsInitialValue: UsernameValue = {
  username: '',
};

const emailSettingsInitialValue: EmailValue = {
  email: '',
};

const passwordSettingsInitialValue: PasswordValue = {
  newPassword: '',
  confirmPassword: '',
  currentPassword: '',
};

export const UserSettingsComponent = () => {
  const dispatch = useDispatch();
  const user = auth?.currentUser;
  const [file, setFile] = useState('');
  const { t } = useTranslation('translation', { keyPrefix: 'userSettings' });

  const [buttons, setButtons] = useState<activeButtons>({
    username: false,
    email: false,
    password: false,
  });

  useEffect(() => {
    const timerId = setTimeout(() => {
      setButtons((prevState: activeButtons) => ({
        ...prevState,
        username: false,
      }));
    }, 5000);
    return () => {
      clearTimeout(timerId);
    };
  }, [buttons.username]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setButtons((prevState: activeButtons) => ({
        ...prevState,
        email: false,
      }));
    }, 5000);
    return () => {
      clearTimeout(timerId);
    };
  }, [buttons.email]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setButtons((prevState: activeButtons) => ({
        ...prevState,
        password: false,
      }));
    }, 5000);
    return () => {
      clearTimeout(timerId);
    };
  }, [buttons.password]);

  const submitUsernameHandler = (values: FormikValues) => {
    setButtons((prevState: activeButtons) => ({
      ...prevState,
      username: !prevState.username,
    }));
    dispatch(updateUsername(values));
  };

  const submitEmailHandler = (values: FormikValues) => {
    setButtons((prevState: activeButtons) => ({
      ...prevState,
      email: !prevState.email,
    }));
    dispatch(updateEmail(values));
  };

  const submitPasswordHandler = (values: FormikValues) => {
    setButtons((prevState: activeButtons) => ({
      ...prevState,
      password: !prevState.password,
    }));
    dispatch(updatePassword(values));
  };

  const handleOnChange = (event: any) => {
    setFile(event.target.value);
    console.log(file);
  };

  return (
    <ParContainer
      maxWidth="lg"
      sx={{
        mt: '1rem',
        padding: '1.5rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <label>
          <input
            accept="image/*"
            multiple
            type="file"
            value={file}
            onChange={(e) => setFile(e.target.value)}
            style={{ display: 'none' }}
          />
          <Button
            component="span"
            onClick={() => {
              console.log(file);
            }}
            sx={{
              '&:hover .avatar-box': {
                backgroundColor: '#212121',
                opacity: '0.1',
              },
              '&:hover .avatar-button': {
                filter: 'brightness(85%)',
              },
              padding: '0',
              mr: { xs: '0', sm: '1rem' },
            }}
          >
            <ParAvatar
              src={userInfo.userImage}
              sx={{
                width: '15rem',
                height: '15rem',
                border: '4px solid',
                borderRadius: '4px',
              }}
            />
            <Box
              position="absolute"
              className="avatar-box"
              sx={{
                width: '100%',
                height: '100%',
              }}
            />
            <Typography
              className="avatar-button"
              position="absolute"
              sx={{
                backgroundColor: 'secondary.main',
                borderRadius: '4px',
                padding: '0.375rem 1rem',
                lineHeight: '1.25',
                border: '2px solid',
                bottom: '-8px',
              }}
            >
              {t('changeAvatar')}
            </Typography>
          </Button>
        </label>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            fontSize: {
              lg: '32px',
              xs: '28px',
            },
            flexWrap: 'wrap',
            flexGrow: '1',
            padding: { xs: '1.3rem 0', md: '0' },
          }}
        >
          <Box
            display="grid"
            gridTemplateRows="12rem 5rem 12rem"
            rowGap="1rem"
            marginRight={{ xs: '0', sm: '1rem' }}
          >
            <Formik
              initialValues={usernameSettingsInitialValue}
              validationSchema={usernameSettingsSchema}
              onSubmit={submitUsernameHandler}
              validateOnBlur
            >
              <Form style={{ gridRow: '1' }}>
                <Box
                  display="grid"
                  gridTemplateRows="3rem 5rem 2rem"
                  rowGap="1rem"
                  justifyItems="center"
                >
                  <Typography gridRow="1" fontSize="2rem">
                    {user?.displayName}
                  </Typography>
                  <FormField fieldName="username" sx={{ gridRow: '2' }} />
                  <FormButton
                    type="submit"
                    sx={{ gridRow: '3' }}
                    disabled={buttons.username}
                  >
                    {t('changeUsername')}
                  </FormButton>
                </Box>
              </Form>
            </Formik>

            <Formik
              initialValues={emailSettingsInitialValue}
              validationSchema={emailSettingsSchema}
              onSubmit={submitEmailHandler}
              validateOnBlur
            >
              <Form style={{ gridRow: '3' }}>
                <Box
                  display="grid"
                  gridTemplateRows="3rem 5rem 2rem"
                  rowGap="1rem"
                  justifyItems="center"
                >
                  <Typography gridRow="1" fontSize="2rem">
                    {user?.email}
                  </Typography>
                  <FormField
                    type="email"
                    fieldName="email"
                    sx={{ gridRow: '2' }}
                  />
                  <FormButton
                    type="submit"
                    sx={{ gridRow: '3' }}
                    disabled={buttons.email}
                  >
                    {t('changeEmail')}
                  </FormButton>
                </Box>
              </Form>
            </Formik>
          </Box>

          <Formik
            initialValues={passwordSettingsInitialValue}
            validationSchema={passwordSettingsSchema}
            onSubmit={submitPasswordHandler}
            validateOnBlur
          >
            <Form>
              <Box
                display="grid"
                gridTemplateRows="3rem 5rem 2.5rem 5rem 2.5rem 5rem 2rem"
                rowGap="1rem"
                justifyItems="center"
              >
                <FormField
                  type="password"
                  fieldName="currentPassword"
                  sx={{ gridRow: '2' }}
                />
                <FormField
                  type="password"
                  fieldName="newPassword"
                  sx={{ gridRow: '4' }}
                />
                <FormField
                  type="password"
                  fieldName="confirmPassword"
                  sx={{ gridRow: '6' }}
                />

                <FormButton
                  type="submit"
                  sx={{ gridRow: '7' }}
                  disabled={buttons.password}
                >
                  {t('changePassword')}
                </FormButton>
              </Box>
            </Form>
          </Formik>
        </Box>
      </Box>
    </ParContainer>
  );
};
