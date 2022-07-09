import {
  AlertProps,
  Box,
  CircularProgress,
  Container,
  Link,
  List,
  ListItem,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import donationAlertLogo from 'assets/images/icons/DA_Alert_White.svg';
import Login from 'components/auth/Login';
import Register from 'components/auth/Register';
import { ParSnackbar } from 'components/styled/ParSnackbar';
import { selectError, selectIsLoading } from 'ducks/auth/selectors';
import { FC, useCallback, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

const AuthPage: FC = () => {
  const theme = useTheme();
  const { t } = useTranslation('translation', { keyPrefix: 'auth' });

  const isLoading = useSelector(selectIsLoading);

  const [isLogin, setLogin] = useState(true);

  const changeComponentType = useCallback(() => {
    setLogin(!isLogin);
  }, [isLogin]);

  const error = useSelector(selectError);

  useLayoutEffect(() => {
    if (!error || error === undefined || error === '') {
      return;
    }

    setSeverity('error');
    setIsOpen(true);
  }, [error]);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [severity, setSeverity] = useState<AlertProps['severity']>();

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <ParSnackbar
        severity={severity}
        open={isOpen}
        onClose={handleClose}
        message={error}
      />
      <Container
        maxWidth="xl"
        sx={{
          padding: {
            xs: '0',
            md: '0 24px',
          },
          display: {
            xs: 'block',
            md: 'flex',
          },
          position: 'relative',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: 'white',
            position: {
              xs: 'static',
              md: 'sticky',
            },
            borderTopWidth: '0',
            borderBottomWidth: {
              xs: '6px',
              md: '0',
            },
            borderLeftWidth: {
              xs: '0',
              md: '10px',
            },
            borderRightWidth: {
              xs: '0',
              md: '10px',
            },
            borderStyle: 'solid',
            borderColor: theme.palette.secondary.main,
            boxShadow: '0 0 60px 2px #212121',
            backgroundColor: theme.palette.primary.main,
            top: '0px',
            height: {
              xs: '100%',
              md: '100vh',
            },
            padding: '2rem',
            flexBasis: '50%',
            boxSizing: 'border-box',
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          <Typography
            textAlign="center"
            component="h1"
            sx={{
              fontSize: {
                xs: '3.5rem',
                sm: '5rem',
                md: '3.8rem',
                lg: '5rem',
                xl: '6rem',
              },
              lineHeight: 1,
            }}
          >
            {t('welcome')}
          </Typography>
          <Box
            flexGrow="1"
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="21rem"
          >
            {isLoading && <CircularProgress color="secondary" size="3rem" />}
            {!isLoading &&
              (isLogin ? (
                <Login changeFormType={changeComponentType} />
              ) : (
                <Register changeFormType={changeComponentType} />
              ))}
          </Box>
          <Box flexGrow="1" />
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flexBasis: '50%',
            paddingLeft: {
              xs: '0',
              md: '80px',
            },
            paddingRight: {
              xs: '0',
              md: '40px',
              lg: '20px',
            },
          }}
        >
          <Box>
            <AuthPageGreetings />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

const GreetingsText = styled(Typography)({
  fontSize: 'inherit',
  textShadow: '1px 1px 5px black',
  lineHeight: '1.08',
  marginBlockStart: '1em',
  marginBlockEnd: '1em',
});

const CheckListItem = styled(ListItem)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});

const CheckListItemText = styled(Typography)({
  fontSize: 'inherit',
  textShadow: '1px 1px 5px black',
  lineHeight: '1.08',
});

const CheckListItemTextRight = styled(CheckListItemText)({
  alignSelf: 'flex-end',
  textAlign: 'right',
});

const AuthPageGreetings: FC = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      textAlign="center"
      color="white"
      fontSize="1.25rem"
      padding="0 1rem"
    >
      <Box
        component="span"
        fontSize={{
          xs: '1.2em',
          sm: '1em',
          md: '1.2em',
        }}
      >
        <GreetingsText fontSize="1.5em" margin="10px">
          Hello there!
        </GreetingsText>
        <GreetingsText fontSize="1.5em" margin="10px" color="secondary">
          Привет!
        </GreetingsText>
        <GreetingsText>
          We are the DnD5CharlistI team - a bunch of people with a dream of
          making truly comfortable and unique character list for
          worldwide-famous game "Dungeons and Dragons", and possibly bring it
          closer to the web.
        </GreetingsText>

        <GreetingsText color="secondary">
          Мы - команда DnD5CharlistI - группа людей, мечтающих сделать
          действительно удобный и уникальный лист персонажа для всемирно
          известной игры "Dungeons and Dragons", и, возможно, сделать шаг к
          упрощению её онлайн-компаний.
        </GreetingsText>
        <br />
        <GreetingsText>
          Our version of charlist is in develop right now, being re-worked and
          polished. And that's what we alerady did:
        </GreetingsText>
        <GreetingsText color="secondary">
          Наша версия листа персонажа сейчас разрабатывается и всячески
          полируется. И вот что мы уже успели сделать:
        </GreetingsText>
        <List>
          <CheckListItem>
            <CheckListItemText>
              All main characteristics of a character were reorganised and got a
              fresh look
            </CheckListItemText>
            <CheckListItemTextRight color="secondary">
              Все основные характеристики персонажа получили новое расположение
              и свежий образ
            </CheckListItemTextRight>
          </CheckListItem>
          <CheckListItem>
            <CheckListItemText>
              Visually-new inventory table was made
            </CheckListItemText>
            <CheckListItemTextRight color="secondary">
              Основан фундамент для визуально новой таблицы инвентаря
            </CheckListItemTextRight>
          </CheckListItem>
          <CheckListItem>
            <CheckListItemText>
              Created an opportunity of account integration
            </CheckListItemText>
            <CheckListItemTextRight color="secondary">
              Создана возможность интеграции информации аккаунта в лист
              персонажа
            </CheckListItemTextRight>
          </CheckListItem>
          <CheckListItem>
            <CheckListItemText>
              New and handy "roll-a-dice" button. Now you can blame imperfect
              digital RNG.
            </CheckListItemText>
            <CheckListItemTextRight color="secondary">
              Удобная кнопка прокидывания кубиков. Теперь вините цифровой
              псевдорандом.
            </CheckListItemTextRight>
          </CheckListItem>
          <CheckListItem>
            <CheckListItemText>
              Added support of different color themes
            </CheckListItemText>
            <CheckListItemTextRight color="secondary">
              Создана возможность поддержки различных цветовых схем
            </CheckListItemTextRight>
          </CheckListItem>
          <br />
          <CheckListItem>
            <CheckListItemText>And so on...</CheckListItemText>
            <CheckListItemTextRight color="secondary">
              И так далее...
            </CheckListItemTextRight>
          </CheckListItem>
        </List>
        <br />
        <br />
        <GreetingsText>
          Consider supporting us now to get{' '}
          <GreetingsText display="inline" fontWeight="bold" fontStyle="italic">
            absolutely nothing
          </GreetingsText>
          . Yea, you read it right. You can donate and prey its not a scam, or
          trust us and get something when it'll be finished. Just make sure
          we'll be able to identify you later.
        </GreetingsText>
        <GreetingsText color="secondary">
          Поддержав нас сейчас, вы можете получить ваше личное{' '}
          <GreetingsText display="inline" fontWeight="bold" fontStyle="italic">
            абсолютное ничего
          </GreetingsText>
          . Да, вы всё правильно поняли. Вы можете задонатить и надеяться что
          это не мошенничество, а можете поверить нам и получить что-то когда мы
          закончим. Просто удостоверьтесь, что мы сможем идентифицировать вас
          позже.
        </GreetingsText>
        <Box display="flex" justifyContent="center">
          <Link
            href="https://www.donationalerts.com/r/mangrimen"
            rel="noreferrer"
            target="_blank"
          >
            <Box
              component="img"
              width="2.5rem"
              alt="Donation Alerts"
              src={donationAlertLogo}
            />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthPage;
