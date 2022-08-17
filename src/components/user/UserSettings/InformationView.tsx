import { Box, Button, Typography } from '@mui/material';
import FormButton from 'components/auth/FormButton';
import FormField from 'components/auth/FormField';
import ParAvatar from 'components/styled/ParAvatar';
import { SettingSection } from 'components/user/SettingSection';
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
      <SettingSection
        title={t('profile')}
        containerProps={{
          sx: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: { xs: 'center', sm: 'space-around' },
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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
              type="file"
              onChange={(e) => handleOnChangeAvatar(e)}
              style={{ display: 'none' }}
            />
            <Button
              component="span"
              sx={{
                padding: '0',
                '&:hover .avatar-overlay': {
                  backgroundColor: '#212121',
                  opacity: '0.1',
                },
                '&:hover .avatar-choose-button': {
                  filter: 'brightness(85%)',
                },
              }}
            >
              <ParAvatar
                src={fileResult ?? user.avatar}
                variant="rounded"
                sx={{
                  width: '15rem',
                  height: '15rem',
                }}
              >
                {user.username || undefined}
              </ParAvatar>
              <Box
                position="absolute"
                className="avatar-overlay"
                sx={{
                  width: '100%',
                  aspectRatio: '1/1',
                  borderRadius: '4px',
                }}
              />
              <Typography
                position="absolute"
                className="avatar-choose-button"
                sx={{
                  backgroundColor: 'secondary.main',
                  border: '2px solid',
                  borderRadius: '4px',
                  padding: '0.375rem 1rem',
                  lineHeight: '1.25',
                  bottom: '-0.5rem',
                  zIndex: '1',
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
          }}
        >
          <Box display="grid" rowGap="2rem">
            <Formik
              initialValues={usernameSettingsInitialValue}
              validationSchema={usernameSettingsSchema}
              onSubmit={submitUsernameHandler}
              validateOnBlur
            >
              <Form>
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
              <Form>
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
      </SettingSection>
    </Box>
  );
};
