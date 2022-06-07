import {
  Box,
  Button,
  Container,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import AuthFormField from 'components/auth/AuthFormField';
import ParAvatar from 'components/styled/ParAvatar';
import { updateEmail, updatePassword, updateUsername } from 'ducks/user';
import { Form, Formik, FormikValues } from 'formik';
import { auth } from 'helpers/firebase';
import { userInfo } from 'mocks/mockUserInfo';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

const Input = styled('input')({
  //display: 'none',
});

interface UsernameValue {
  username: string;
}

interface EmailValue {
  email: string;
}

interface PasswordValue {
  password: string;
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
  password: '',
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
    <Container
      maxWidth="lg"
      sx={{
        mt: '1rem',
        border: '4px solid',
        borderColor: theme.palette.primary.main,
        borderRadius: '4px',
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          mt: '1rem',
          mb: '1rem',
          alignItems: 'center',
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
          >
            <ParAvatar
              src={userInfo.userImage}
              sx={{
                width: '200px',
                height: '200px',
                border: '4px solid',
                borderRadius: '4px',
                fontSize: '20px',
                backgroundSize: 'cover',
              }}
            />
            <Typography position="absolute">Change avatar</Typography>
          </Button>
        </label>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            ml: '1rem',
            mr: '1rem',
            fontSize: {
              lg: '32px',
              xs: '28px',
            },
            flexWrap: 'wrap',
          }}
        >
          <Box padding="1rem">
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Formik
                initialValues={usernameSettingsInitialValue}
                validationSchema={usernameSettingsSchema}
                onSubmit={submitUsernameHandler}
                validateOnBlur
              >
                <Form>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Typography>{user?.displayName}</Typography>
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
                      sx={TextFieldStyle}
                    />
                    <Button
                      type="submit"
                      sx={{ mb: '1rem' }}
                      disabled={buttons.username}
                    >
                      Change name
                    </Button>
                  </Box>
                </Form>
              </Formik>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Formik
                initialValues={emailSettingsInitialValue}
                validationSchema={emailSettingsSchema}
                onSubmit={submitEmailHandler}
                validateOnBlur
              >
                <Form>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <Typography>{user?.email}</Typography>
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
                      sx={TextFieldStyle}
                    />
                    <Button
                      type="submit"
                      sx={{ mb: '1rem' }}
                      disabled={buttons.email}
                    >
                      Change email
                    </Button>
                  </Box>
                </Form>
              </Formik>
            </Box>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              padding: '1rem',
            }}
          >
            <Formik
              initialValues={passwordSettingsInitialValue}
              validationSchema={passwordSettingsSchema}
              onSubmit={submitPasswordHandler}
              validateOnBlur
            >
              <Form>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
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
                    sx={TextFieldStyle}
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
                    sx={TextFieldStyle}
                  />
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
                    sx={TextFieldStyle}
                  />

                  <Button
                    type="submit"
                    sx={{ mb: '1rem' }}
                    disabled={buttons.password}
                  >
                    Change password
                  </Button>
                </Box>
              </Form>
            </Formik>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};
