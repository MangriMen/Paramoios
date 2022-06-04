import Navbar from 'components/common/Navbar';
import { ReactNode } from 'react';

function PageWithNavbar({ children }: { children: ReactNode }): JSX.Element {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

export default PageWithNavbar;
