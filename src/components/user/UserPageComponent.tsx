import ParContainer from 'components/styled/ParContainer';
import { FC } from 'react';

import UserCardComponent from './UserCardComponent';

const UserPageComponent: FC = () => {
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
};

export default UserPageComponent;
