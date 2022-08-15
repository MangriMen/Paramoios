import BrushIcon from '@mui/icons-material/Brush';
import InfoIcon from '@mui/icons-material/Info';
import LockIcon from '@mui/icons-material/Lock';
import { Box, Button, ButtonProps, Typography } from '@mui/material';
import FormButton from 'components/auth/FormButton';
import FormField from 'components/auth/FormField';
import ParAvatar from 'components/styled/ParAvatar';
import ParContainer from 'components/styled/ParContainer';
import ParDivider from 'components/styled/ParDivider';
import { selectUser } from 'ducks/user/selectors';
import {
  updateEmail,
  updateImage,
  updatePassword,
  updateUsername,
} from 'ducks/userSettings';
import { Form, Formik } from 'formik';
import { BaseSyntheticEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate, useParams } from 'react-router';
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
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export const InformationPage: FC = () => {
  const dispatch = useDispatch();

  const { t } = useTranslation('translation', { keyPrefix: 'userSettings' });

  const user = useSelector(selectUser);

  const [fileResult, setFileResult] = useState<string | undefined>(undefined);

  const [changeAvatarButton, setChangeAvatarButton] = useState(false);

  const [avatarError, setAvatarError] = useState('');

  const [buttons, setButtons] = useState<activeButtons>({
    username: false,
    email: false,
    avatar: true,
  });

  useEffect(() => {
    const timerId = setTimeout(() => {
      setButtons((prevState: activeButtons) => ({
        ...prevState,
        username: false,
      }));
    }, 3000);
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
    }, 3000);
    return () => {
      clearTimeout(timerId);
    };
  }, [buttons.email]);

  useEffect(() => {
    if (changeAvatarButton) {
      const timerId = setTimeout(() => {
        setChangeAvatarButton(false);
        setButtons((prevState: activeButtons) => ({
          ...prevState,
          avatar: false,
        }));
      }, 3000);
      return () => {
        clearTimeout(timerId);
      };
    }
  }, [changeAvatarButton]);

  const submitUsernameHandler = ({ username }: UsernameValue) => {
    setButtons((prevState: activeButtons) => ({
      ...prevState,
      username: !prevState.username,
    }));
    dispatch(updateUsername(username));
  };

  const submitEmailHandler = ({ email }: EmailValue) => {
    setButtons((prevState: activeButtons) => ({
      ...prevState,
      email: !prevState.email,
    }));
    dispatch(updateEmail(email));
  };

  const submitImageHandler = () => {
    setButtons((prevState: activeButtons) => ({
      ...prevState,
      avatar: !prevState.avatar,
    }));
    setChangeAvatarButton(true);
    dispatch(updateImage(fileResult));
  };

  const handleOnChangeAvatar = (event: BaseSyntheticEvent) => {
    const file = event.target.files[0];
    if (file === undefined) {
      return;
    }

    setButtons((prevState: activeButtons) => ({
      ...prevState,
      avatar: true,
    }));

    if (file.size > 1024 * 1024) {
      setFileResult(undefined);
      setChangeAvatarButton(false);
      setAvatarError('Please upload a picture smaller than 1 MB');
      return;
    }

    setAvatarError('');

    const fr = new FileReader();
    fr.onload = onLoadImage;
    fr.readAsDataURL(file);

    setButtons((prevState: activeButtons) => ({
      ...prevState,
      avatar: false,
    }));
  };

  function onLoadImage(event: ProgressEvent<FileReader>) {
    if (typeof event.target?.result === 'string')
      setFileResult(event.target.result);
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: { xs: 'center', sm: 'space-evenly' },
        flexWrap: 'wrap',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          alignItems: 'center',
          width: '15.5rem',
        }}
      >
        <label
          style={{
            width: '15.5rem',
            height: '15.5rem',
          }}
        >
          <input
            accept="image/*"
            multiple
            type="file"
            onChange={(e) => handleOnChangeAvatar(e)}
            style={{ display: 'none' }}
          />
          <Button
            component="span"
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
              src={fileResult ?? user.avatar}
              sx={{
                width: '15rem',
                height: '15rem',
                border: '4px solid',
                borderRadius: '4px',
                borderColor: 'primary.main',
                fontSize: '7.75rem',
              }}
            >
              {user.username || undefined}
            </ParAvatar>
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
              {t('chooseAvatar')}
            </Typography>
          </Button>
        </label>
        <FormButton
          onClick={submitImageHandler}
          disabled={buttons.avatar}
          sx={{ marginTop: '2rem', height: '2rem' }}
        >
          {t('changeAvatar')}
        </FormButton>
        <Typography
          color="error"
          textAlign="center"
          sx={{
            mt: '1rem',
            width: '15.5rem',
            wordWrap: 'break-word',
          }}
        >
          {!!avatarError && avatarError}
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: {
            lg: '32px',
            xs: '28px',
          },
        }}
      >
        <Box display="grid" rowGap="1rem">
          <Formik
            initialValues={usernameSettingsInitialValue}
            validationSchema={usernameSettingsSchema}
            onSubmit={submitUsernameHandler}
            validateOnBlur
          >
            <Form style={{ gridRow: '1' }}>
              <Box display="grid" rowGap="1rem" justifyItems="center">
                <Typography fontSize="2rem">{user.username}</Typography>
                <FormField fieldName="username" />
                <FormButton type="submit" disabled={buttons.username}>
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
              <Box display="grid" rowGap="1rem" justifyItems="center">
                <Typography fontSize="2rem">{user.email}</Typography>
                <FormField type="email" fieldName="email" />
                <FormButton type="submit" disabled={buttons.email}>
                  {t('changeEmail')}
                </FormButton>
              </Box>
            </Form>
          </Formik>
        </Box>
      </Box>
    </Box>
  );
};

export const PasswordPage: FC = () => {
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: { md: 'flex-start' },
        justifyContent: 'center',
        width: '100%',
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
  );
};

export const PageButton: FC<ButtonProps & { active: boolean }> = ({
  active,
  sx,
  ...props
}) => {
  return (
    <Button
      variant={active ? 'contained' : 'text'}
      color="primary"
      sx={{
        minWidth: '0',
        minHeight: '0',
        padding: '0.4rem',
        justifyContent: 'flex-start',
        ...sx,
      }}
      {...props}
    />
  );
};

export const UserSettingsComponent: FC = () => {
  const navigate = useNavigate();

  const { page } = useParams();

  useEffect(() => {
    if (page === undefined) {
      navigate('information');
    }
  }, [navigate, page]);

  const { t } = useTranslation('translation', { keyPrefix: 'userSettings' });

  const toInformationPage = () => {
    navigate('information');
  };

  const toPasswordPage = () => {
    navigate('password');
  };

  const toPersonalizationPage = () => {
    navigate('personalization');
  };

  const iconStyle = { marginRight: '0.2rem' };

  return (
    <ParContainer
      maxWidth="lg"
      sx={{
        mt: '1rem',
        padding: '1.5rem',
        height: { xs: 'auto', md: 'calc(100vh - 3rem)' },
      }}
    >
      <Box sx={{ display: 'flex', flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
        <Box
          sx={{
            minWidth: { xs: 'none', md: '14rem' },
            width: { xs: '100%', md: 'auto' },
            marginBottom: { xs: '1rem', md: '0' },
            display: 'flex',
            flexDirection: 'column',
            margin: '0 1.5rem 0 0',
            boxSizing: 'border-box',
          }}
        >
          <PageButton
            active={page === 'information'}
            onClick={toInformationPage}
          >
            <InfoIcon sx={iconStyle} />
            <Typography>{t('information')}</Typography>
          </PageButton>
          <PageButton active={page === 'password'} onClick={toPasswordPage}>
            <LockIcon sx={iconStyle} />
            <Typography>{t('password')}</Typography>
          </PageButton>
          <PageButton
            active={page === 'personalization'}
            onClick={toPersonalizationPage}
          >
            <BrushIcon sx={iconStyle} />
            <Typography>{t('personalization')}</Typography>
          </PageButton>
        </Box>
        <Box
          sx={{
            width: '100%',
            overflow: 'scroll',
            display: 'flex',
            justifyContent: 'flex-start',
          }}
        >
          <Routes>
            <Route path="information" element={<InformationPage />} />
            <Route path="password" element={<PasswordPage />} />
          </Routes>
        </Box>
      </Box>
    </ParContainer>
  );
};
