import { Box, Button, Typography, styled, useTheme } from '@mui/material';
import AuthFormField from 'components/auth/AuthFormField';
import ParAvatar from 'components/styled/ParAvatar';
import { updateEmail, updatePassword, updateUsername } from 'ducks/user';
import { Form, Formik, FormikValues } from 'formik';
import { auth } from 'helpers/firebase';
import { userInfo } from 'mocks/mockUserInfo';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import AuthFormButton from '../auth/AuthFormButton';
import ParContainer from '../styled/ParContainer';

const Input = styled('input')({
  display: 'none',
});

interface UsernameValue {
  username: string;
}

interface EmailValue {
  email: string;
}

interface PasswordValue {
  newPassword: string;
  confirmPassword: string;
  currentPassword: string;
}

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

const usernameSettingsSchema = yup.object({
  username: yup.string().required('Username is required'),
});

const emailSettingsSchema = yup.object({
  email: yup.string().email().required('Email is required'),
});

const passwordSettingsSchema = yup.object({
  newPassword: yup
    .string()
    .required('Password is required')
    .matches(/^\S*$/, 'whitespace is not allowed')
    .min(8, 'password should be 8 chars minimum.'),
  confirmPassword: yup
    .string()
    .required('Password is required')
    .oneOf([yup.ref('newPassword')], 'Passwords must match'),
});

interface activeButtons {
  username: boolean;
  email: boolean;
  password: boolean;
}

export const UserSettingsComponent = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const user = auth?.currentUser;
  const [file, setFile] = useState('');

  const TextFieldStyle = {
    minHeight: '79px',
    '& .MuiOutlinedInput-root': {
      fontSize: '1rem',
      input: {
        '&:-webkit-autofill': {
          WebkitTextFillColor: theme.palette.primary.main,
          WebkitBoxShadow:
            '0 0 0 1000px ' + theme.palette.secondary.light + ' inset',
        },
      },
      color: theme.palette.primary.main,
      '& fieldset': {
        borderColor: theme.palette.primary.main,
        borderWidth: '2px',
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
    },
  };

  const avatarButtonStyle = {
    width: '200px',
    height: '200px',
    border: '4px solid',
    borderRadius: '4px',
    borderColor: theme.palette.primary.main,
    fontSize: '20px',
    backgroundImage: `url(${userInfo.userImage})`,
    backgroundSize: 'cover',
  };

  const [buttons, setButtons] = useState({
    username: false,
    email: false,
    password: false,
  });

  const submitUsernameHandler = (values: FormikValues) => {
    setButtons((prevState: activeButtons) => ({
      ...prevState,
      username: !prevState.username,
    }));
    setTimeout(() => {
      setButtons((prevState: activeButtons) => ({
        ...prevState,
        username: false,
      }));
    }, 5000);
    dispatch(updateUsername(values));
  };

  const submitEmailHandler = (values: FormikValues) => {
    setButtons((prevState: activeButtons) => ({
      ...prevState,
      email: !prevState.email,
    }));
    setTimeout(() => {
      setButtons((prevState: activeButtons) => ({
        ...prevState,
        email: false,
      }));
    }, 5000);
    dispatch(updateEmail(values));
  };

  const submitPasswordHandler = (values: FormikValues) => {
    setButtons((prevState: activeButtons) => ({
      ...prevState,
      password: !prevState.password,
    }));
    setTimeout(() => {
      setButtons((prevState: activeButtons) => ({
        ...prevState,
        password: false,
      }));
    }, 5000);
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
          justifyContent: { xs: 'center', md: 'start' },
          flexWrap: 'wrap',
        }}
      >
        <label>
          <Input
            accept="image/*"
            multiple
            type="file"
            value={file}
            onChange={(e) => setFile(e.target.value)}
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
              Change avatar
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
            gridTemplateRows="11rem 5rem 11rem"
            rowGap="0.5rem"
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
                  gridTemplateRows="1.5rem 5rem 2rem"
                  rowGap="1rem"
                  justifyItems="center"
                >
                  <Typography gridRow="1">{user?.displayName}</Typography>
                  <AuthFormField
                    fullWidth={false}
                    fieldName="username"
                    color="primary"
                    InputLabelProps={{
                      sx: {
                        fontSize: '1rem',
                        color: theme.palette.primary.main,
                      },
                    }}
                    margin="none"
                    sx={{ ...TextFieldStyle, gridRow: '2' }}
                  />
                  <AuthFormButton
                    type="submit"
                    sx={{ gridRow: '3' }}
                    disabled={buttons.username}
                    color="primary"
                    fullWidth={false}
                  >
                    Change name
                  </AuthFormButton>
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
                  gridTemplateRows="1.5rem 5rem 2rem"
                  rowGap="1rem"
                  justifyItems="center"
                >
                  <Typography gridRow="1">{user?.email}</Typography>
                  <AuthFormField
                    fullWidth={false}
                    type="email"
                    fieldName="email"
                    color="primary"
                    InputLabelProps={{
                      sx: {
                        fontSize: '1rem',
                        color: theme.palette.primary.main,
                      },
                    }}
                    sx={{ ...TextFieldStyle, gridRow: '2' }}
                    margin="none"
                  />
                  <AuthFormButton
                    type="submit"
                    sx={{ gridRow: '3' }}
                    disabled={buttons.email}
                    color="primary"
                    fullWidth={false}
                  >
                    Change email
                  </AuthFormButton>
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
                gridTemplateRows="1.5rem 5rem 1.5rem 5rem 1.5rem 5rem 2rem"
                rowGap="1rem"
                justifyItems="center"
              >
                <AuthFormField
                  type="password"
                  fullWidth={false}
                  fieldName="currentPassword"
                  color="primary"
                  InputLabelProps={{
                    sx: {
                      fontSize: '1rem',
                      color: theme.palette.primary.main,
                    },
                  }}
                  sx={{ ...TextFieldStyle, gridRow: '2' }}
                  margin="none"
                />
                <AuthFormField
                  type="password"
                  fullWidth={false}
                  fieldName="newPassword"
                  color="primary"
                  InputLabelProps={{
                    sx: {
                      fontSize: '1rem',
                      color: theme.palette.primary.main,
                    },
                  }}
                  sx={{ ...TextFieldStyle, gridRow: '4' }}
                  margin="none"
                />
                <AuthFormField
                  type="password"
                  fullWidth={false}
                  fieldName="confirmPassword"
                  color="primary"
                  InputLabelProps={{
                    sx: {
                      fontSize: '1rem',
                      color: theme.palette.primary.main,
                    },
                  }}
                  sx={{ ...TextFieldStyle, gridRow: '6' }}
                  margin="none"
                />

                <AuthFormButton
                  type="submit"
                  sx={{ gridRow: '7' }}
                  disabled={buttons.password}
                  color="primary"
                  fullWidth={false}
                >
                  Change password
                </AuthFormButton>
              </Box>
            </Form>
          </Formik>
        </Box>
      </Box>
    </ParContainer>
  );
};
