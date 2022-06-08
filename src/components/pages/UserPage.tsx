import ParContainer from 'components/styled/ParContainer';
import { FC } from 'react';

import UserCard from '../user/UserCard';

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
