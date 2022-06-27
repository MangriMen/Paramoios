import ParContainer from 'components/styled/ParContainer';
import UserCard from 'components/user/UserCard';
import { FC } from 'react';

const UserPage: FC = () => {
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
};

export default UserPage;
