import { ROUTE } from 'consts';
import { FC } from 'react';
import { Route, Routes } from 'react-router';

import MainPageComponent from './MainPageComponent';
import AuthPageComponent from './auth/AuthPageComponent';
import NotFoundPageComponent from './common/NotFoundPageComponent';
import PageWithNavbar from './layout/PageWithNavbar';
import UserPageComponent from './user/UserPageComponent';

const AppContainer: FC = () => {
  return (
    <>
      <Routes>
        <Route
          path={ROUTE.HOME}
          element={
            <PageWithNavbar>
              <MainPageComponent />
            </PageWithNavbar>
          }
        />
        <Route path={ROUTE.AUTH} element={<AuthPageComponent />} />
        <Route
          path={ROUTE.ME}
          element={
            <PageWithNavbar>
              <UserPageComponent />
            </PageWithNavbar>
          }
        />
        <Route
          path={ROUTE.PAGE_404}
          element={
            <PageWithNavbar>
              <NotFoundPageComponent />
            </PageWithNavbar>
          }
        />
        <Route
          path={ROUTE.SETTINGS}
          element={
            <PageWithNavbar>
              <NotFoundPageComponent />
            </PageWithNavbar>
          }
        />
      </Routes>
    </>
  );
};

export default AppContainer;
