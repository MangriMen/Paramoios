import { Box, Button, Typography } from '@mui/material';
import FormButton from 'components/auth/FormButton';
import FormField from 'components/auth/FormField';
import ParAvatar from 'components/styled/ParAvatar';
import ParDivider from 'components/styled/ParDivider';
import {
  EmailValue,
  UsernameValue,
  activeButtons,
} from 'components/user/interfaces';
import { selectUser } from 'ducks/user/selectors';
import { updateEmail, updateImage, updateUsername } from 'ducks/userSettings';
import { Form, Formik } from 'formik';
import { BaseSyntheticEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  emailSettingsSchema,
  usernameSettingsSchema,
} from 'schemas/userSettings';

const usernameSettingsInitialValue: UsernameValue = {
  username: '',
};

const emailSettingsInitialValue: EmailValue = {
  email: '',
};

export const InformationView: FC = () => {
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
    <Box sx={{ width: '100%' }}>
      <Box>
        <Typography variant="h3" color="primary.dark">
          {t('changeProfile')}
        </Typography>
        <ParDivider sx={{ width: '100%', marginBottom: '1rem' }} />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: { xs: 'center', sm: 'space-around' },
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
      </Box>
    </Box>
  );
};
