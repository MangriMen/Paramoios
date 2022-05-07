import NavbarComponent from 'components/common/NavbarComponent';
import { ReactNode } from 'react';

function PageWithNavbar({ children }: { children: ReactNode }): JSX.Element {
  return (
    <>
      <NavbarComponent />
      {children}
    </>
  );
}

export default PageWithNavbar;
