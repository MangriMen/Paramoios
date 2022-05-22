import { Avatar, Box, Typography, useTheme } from '@mui/material';
import { auth } from 'helpers/firebase';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return `${name.charAt(0)}`;
}

function UserCardComponent() {
  const user = auth?.currentUser;

  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          mt: '1rem',
          mb: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <Avatar
          variant="square"
          sx={{
            backgroundColor: stringToColor(String(user?.displayName)),
            width: '200px',
            height: '200px',
            border: '4px solid',
            borderRadius: '4px',
            borderColor: theme.palette.primary.main,
            fontSize: '128px',
          }}
          children={stringAvatar(String(user?.displayName))}
        ></Avatar>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            ml: '1rem',
            mr: '1rem',
            fontSize: {
              lg: '32px',
              xs: '28px',
            },
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="h3" fontSize="inherit">
            Name: {user?.displayName}
          </Typography>
          <Typography variant="h3" fontSize="inherit">
            Email: {user?.email}
          </Typography>
        </Box>
      </Box>
    </>
  );
}

export default UserCardComponent;
