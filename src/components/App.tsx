import { ROUTE } from 'consts';
import { FC } from 'react';
import { Route, Routes } from 'react-router';

import MainPage from './charlist/MainPage';
import PageWithNavbar from './layout/PageWithNavbar';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';
import UserPage from './pages/UserPage';

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route
          path={ROUTE.HOME}
          element={
            <PageWithNavbar>
              <MainPage />
            </PageWithNavbar>
          }
        />
        <Route path={ROUTE.AUTH} element={<AuthPage />} />
        <Route
          path={ROUTE.ME}
          element={
            <PageWithNavbar>
              <UserPage />
            </PageWithNavbar>
          }
        />
        <Route
          path={ROUTE.PAGE_404}
          element={
            <PageWithNavbar>
              <NotFoundPage />
            </PageWithNavbar>
          }
        />
        <Route
          path={ROUTE.SETTINGS}
          element={
            <PageWithNavbar>
              <NotFoundPage />
            </PageWithNavbar>
          }
        />
      </Routes>
    </>
  );
};

export default App;
