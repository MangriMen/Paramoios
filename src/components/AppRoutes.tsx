import Charlist from 'components/charlist/Charlist';
import PageWithNavbar from 'components/layout/PageWithNavbar';
import AuthPage from 'components/pages/AuthPage';
import MainPage from 'components/pages/MainPage';
import NotFoundPage from 'components/pages/NotFoundPage';
import UserPage from 'components/pages/UserPage';
import { UserSettings } from 'components/pages/UserSettings';
import { AuthRoute } from 'components/routes/AuthRoute';
import { UserRoute } from 'components/routes/UserRoute';
import { ROUTE } from 'consts';
import { FC } from 'react';
import { Route, Routes } from 'react-router';

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route path={ROUTE.AUTH} element={<AuthPage />} />
      </Route>
      <Route element={<UserRoute />}>
        <Route path={ROUTE.HOME} element={<MainPage />} />
        <Route element={<PageWithNavbar />}>
          <Route path={ROUTE.CHARLIST} element={<Charlist />} />
          <Route path={ROUTE.ME} element={<UserPage />} />
          <Route path={ROUTE.SETTINGS} element={<UserSettings />}>
            <Route
              path={`${ROUTE.SETTINGS}/:page`}
              element={<UserSettings />}
            />
          </Route>
          <Route path={ROUTE.PAGE_404} element={<NotFoundPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
