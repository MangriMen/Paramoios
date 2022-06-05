import NavbarComponent from 'components/common/NavbarComponent';
import { FC, ReactNode } from 'react';

const PageWithNavbar: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <NavbarComponent />
      {children}
    </>
  );
};

export default PageWithNavbar;
