import { Box, Typography } from '@mui/material';
import ParAvatar from 'components/styled/ParAvatar';
import ParLink from 'components/styled/ParLink';
import { ROUTE } from 'consts';
import { auth } from 'helpers/firebase';
import { useNavigate } from 'react-router-dom';

function UserCardComponent() {
  const user = auth?.currentUser;
  const navigate = useNavigate();

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
        variant="square"
        sx={{
          width: '15rem',
          height: '15rem',
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
          padding: '1rem',
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
          Name:
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
          Email:
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
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          flexGrow: '1',
        }}
      >
        <ParLink
          color="primary"
          component="button"
          onClick={() => navigate(ROUTE.SETTINGS)}
          sx={{ textShadow: '1px 1px 1px #681e22' }}
        >
          Settings
        </ParLink>
      </Box>
    </Box>
  );
}

export default UserCardComponent;
