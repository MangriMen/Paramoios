import { Box, Link, List, ListItem, Typography, styled } from '@mui/material';
import donationAlertLogo from 'assets/images/icons/DA_Alert_White.svg';
import { FC } from 'react';

const GreetingsText = styled(Typography)({
  fontSize: 'inherit',
  textShadow: '1px 1px 5px black',
  lineHeight: '1.08',
  marginBlockStart: '1em',
  marginBlockEnd: '1em',
}) as typeof Typography;

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

export const Information: FC = () => {
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
          <GreetingsText
            component="span"
            display="inline"
            fontWeight="bold"
            fontStyle="italic"
          >
            absolutely nothing
          </GreetingsText>
          . Yea, you read it right. You can donate and prey its not a scam, or
          trust us and get something when it'll be finished. Just make sure
          we'll be able to identify you later.
        </GreetingsText>
        <GreetingsText color="secondary">
          Поддержав нас сейчас, вы можете получить ваше личное{' '}
          <GreetingsText
            component="span"
            display="inline"
            fontWeight="bold"
            fontStyle="italic"
          >
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
