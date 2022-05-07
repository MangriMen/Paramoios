import { Container, useTheme } from '@mui/material';

import UserCardComponent from './UserCardComponent';

function UserPageComponent() {
  const theme = useTheme();

  return (
    <Container
      maxWidth="lg"
      sx={{
        mt: '1rem',
        border: '4px solid',
        borderColor: theme.palette.primary.main,
        borderRadius: '4px',
        backgroundColor: theme.palette.secondary.main,
      }}
    >
      <UserCardComponent />
    </Container>
  );
}

export default UserPageComponent;
