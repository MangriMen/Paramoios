import ParContainer from 'components/styled/ParContainer';

import UserCardComponent from './UserCardComponent';

function UserPageComponent() {
  return (
    <ParContainer
      maxWidth="lg"
      sx={{
        mt: '1rem',
        padding: '1.5rem',
      }}
    >
      <UserCardComponent />
    </ParContainer>
  );
}

export default UserPageComponent;
