import { Box, Card, Divider, Typography } from '@mui/material';
import ParAvatar from 'components/styled/ParAvatar';
import ParLink from 'components/styled/ParLink';
import { ROUTE } from 'consts';
import { selectUser } from 'ducks/user/selectors';
import { userInfo } from 'mocks/mockUserInfo';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const characterCards = (characters: any) =>
  characters.map((character: any) => (
    <Card
      variant="outlined"
      key={character.id}
      sx={{
        display: 'flex',
        flexDiration: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        mb: '1rem',
        borderWidth: '2px',
        borderColor: 'primary.main',
        backgroundColor: 'secondary.main',
        fontSize: { xs: '1.2rem', lg: '1.5rem' },
      }}
    >
      <Typography fontSize="inherit">Link: {character.id}</Typography>
      <Box>
        <Typography fontSize="inherit">Lvl: {character.level}</Typography>
        <Typography fontSize="inherit">Race: {character.race}</Typography>
        <Typography fontSize="inherit">Class: {character.class}</Typography>
      </Box>
      <ParAvatar src={character.image} />
    </Card>
  ));

const UserCard: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'userProfile' });
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  const toSettings = () => {
    navigate(ROUTE.SETTINGS);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      <ParAvatar
        src={user.avatar}
        variant="rounded"
        sx={{
          width: '15rem',
          height: '15rem',
          fontSize: '7.75rem',
        }}
      >
        {user.username || undefined}
      </ParAvatar>
      <Box
        sx={{
          width: {
            xs: '100%',
            md: 'auto',
          },
          display: 'flex',
          flexDirection: 'column',
          fontSize: {
            lg: '32px',
            xs: '28px',
          },
          flexWrap: 'wrap',
          padding: '0.7rem',
        }}
      >
        <Typography
          variant="h3"
          fontSize="inherit"
          sx={{
            wordWrap: 'break-word',
            width: '100%',
          }}
          color="primary"
        >
          {t('name')}:
        </Typography>
        <Typography
          variant="h3"
          fontSize="inherit"
          sx={{
            wordWrap: 'break-word',
            width: '100%',
          }}
        >
          {user.username}
        </Typography>
        <Typography
          variant="h3"
          fontSize="inherit"
          sx={{
            wordWrap: 'break-word',
            width: '100%',
          }}
          color="primary"
        >
          {t('email')}:
        </Typography>
        <Typography
          variant="h3"
          fontSize="inherit"
          sx={{
            wordWrap: 'break-word',
            width: '100%',
          }}
        >
          {user.email}
        </Typography>
        <Typography
          variant="h3"
          fontSize="inherit"
          sx={{
            wordWrap: 'break-word',
            width: '100%',
          }}
          color="primary"
        >
          {t('otherInfo')}:
        </Typography>
        <Typography
          variant="h3"
          fontSize="inherit"
          sx={{
            wordWrap: 'break-word',
            width: '100%',
          }}
        >
          {userInfo.otherInfo}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          flexGrow: '1',
          justifyContent: 'end',
        }}
      >
        <ParLink
          color="primary"
          component="button"
          onClick={toSettings}
          sx={{ textShadow: '1px 1px 1px #681e22' }}
        >
          {t('settings')}
        </ParLink>
      </Box>
      <Box>
        <Divider
          sx={{
            margin: '2rem',
            borderColor: '#681e22',
            backgroundColor: '#681e22',
            borderWidth: '2px',
            borderRadius: '2px',
          }}
        />
        <Typography
          variant="h3"
          fontSize={{ xs: '1.2rem', lg: '1.5rem' }}
          sx={{
            wordWrap: 'break-word',
            width: '100%',
          }}
          color="primary"
        >
          {t('description')}:
        </Typography>
        <Typography
          variant="h3"
          fontSize={{ xs: '1.2rem', lg: '1.5rem' }}
          sx={{
            wordWrap: 'break-word',
            width: '100%',
          }}
        >
          {userInfo.descriptions}
        </Typography>
        <Divider
          sx={{
            margin: '2rem',
            borderColor: '#681e22',
            backgroundColor: '#681e22',
            borderWidth: '2px',
            borderRadius: '2px',
          }}
        />
        <Typography
          variant="h3"
          sx={{
            wordWrap: 'break-word',
            width: '100%',
            mb: '1rem',
          }}
          fontSize={{ xs: '1.2rem', lg: '1.5rem' }}
          color="primary"
        >
          {t('yourCharacters')}:
        </Typography>
        {characterCards(userInfo.userCharacters)}
      </Box>
    </Box>
  );
};

export default UserCard;
