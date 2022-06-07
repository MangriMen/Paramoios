import Navbar from 'components/common/Navbar';
import { FC, ReactNode } from 'react';

const PageWithNavbar: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default PageWithNavbar;
