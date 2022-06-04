import ParContainer from 'components/styled/ParContainer';

import UserCard from '../user/UserCard';

function UserPage() {
  return (
    <ParContainer
      maxWidth="lg"
      sx={{
        mt: '1rem',
        padding: '1.5rem',
      }}
    >
      <UserCard />
    </ParContainer>
  );
}

export default UserPage;
