import { Box, Card, Divider, Typography, TypographyProps } from '@mui/material';
import ParAvatar from 'components/styled/ParAvatar';
import ParDivider from 'components/styled/ParDivider';
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

export const StyledTypography: FC<TypographyProps> = ({ sx, ...props }) => {
  return (
    <Typography
      variant="h3"
      fontSize="inherit"
      color="primary"
      sx={{
        ...sx,
        wordWrap: 'break-word',
        width: '100%',
      }}
      {...props}
    />
  );
};

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
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'wrap',
          width: {
            xs: '100%',
            md: 'auto',
          },
          padding: '0.7rem',
          fontSize: {
            xs: '1.75rem',
            lg: '2rem',
          },
        }}
      >
        <StyledTypography>{t('name')}:</StyledTypography>
        <StyledTypography color="black">{user.username}</StyledTypography>
        <StyledTypography>{t('email')}:</StyledTypography>
        <StyledTypography color="black">{user.email}</StyledTypography>
        <StyledTypography>{t('otherInfo')}:</StyledTypography>
        <StyledTypography color="black">{userInfo.otherInfo}</StyledTypography>
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
          textShadowBase="1px 1px 1px"
          textShadowColor="primary"
        >
          {t('settings')}
        </ParLink>
      </Box>
      <Box>
        <ParDivider sx={{ margin: '2rem' }} />
        <StyledTypography fontSize={{ xs: '1.2rem', lg: '1.5rem' }}>
          {t('description')}:
        </StyledTypography>
        <StyledTypography
          color="black"
          fontSize={{ xs: '1.2rem', lg: '1.5rem' }}
        >
          {userInfo.descriptions}
        </StyledTypography>
        <ParDivider sx={{ margin: '2rem' }} />
        <StyledTypography
          fontSize={{ xs: '1.2rem', lg: '1.5rem' }}
          sx={{ mb: '1rem' }}
        >
          {t('yourCharacters')}:
        </StyledTypography>
        {characterCards(userInfo.userCharacters)}
      </Box>
    </Box>
  );
};

export default UserCard;
