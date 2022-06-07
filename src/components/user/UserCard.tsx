import { Box, Card, Divider, Typography } from '@mui/material';
import ParAvatar from 'components/styled/ParAvatar';
import ParLink from 'components/styled/ParLink';
import { auth } from 'configs/firebase';
import { ROUTE } from 'consts';
import { userInfo } from 'mocks/mockUserInfo';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const UserCard: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'userProfile' });
  const user = auth?.currentUser;
  const navigate = useNavigate();

  const characterCard = (array: any) =>
    array.map((item: any) => (
      <Card
        variant="outlined"
        key={item.idLink}
        sx={{
          display: 'flex',
          flexDiration: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#e9c996',
          alignItems: 'center',
          padding: '1rem',
          mt: '1rem',
          mb: '1rem',
          borderWidth: '2px',
          borderColor: '#681e22',
          fontSize: { xs: '1.2rem', lg: '1.5rem' },
        }}
      >
        <Typography fontSize="inherit">Link: {item.idLink}</Typography>
        <Box>
          <Typography fontSize="inherit">Lvl: {item.lvl}</Typography>
          <Typography fontSize="inherit">Race: {item.race}</Typography>
          <Typography fontSize="inherit">Class: {item.class}</Typography>
        </Box>

        <ParAvatar src={item.img} />
      </Card>
    ));

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
        variant="rounded"
        sx={{
          width: '15rem',
          height: '15rem',
          fontSize: '7.75rem',
        }}
      >
        {user?.displayName}
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
          {user?.displayName}
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
          {user?.email}
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
          onClick={() => navigate(ROUTE.SETTINGS)}
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
          }}
          fontSize={{ xs: '1.2rem', lg: '1.5rem' }}
          color="primary"
        >
          {t('yourCharacters')}:
        </Typography>
        {characterCard(userInfo.userCharacters)}
      </Box>
    </Box>
  );
};

export default UserCard;
