import PageWithNavbar from 'components/layout/PageWithNavbar';
import AuthPage from 'components/pages/AuthPage';
import MainPage from 'components/pages/MainPage';
import NotFoundPage from 'components/pages/NotFoundPage';
import UserPage from 'components/pages/UserPage';
import { AuthRoute } from 'components/routes/AuthRoute';
import { UserSettingsComponent } from 'components/user/UserSettingsComponent';
import { auth } from 'configs/firebase';
import { ROUTE } from 'consts';
import { loginSuccess, logoutSuccess } from 'ducks/auth';
import { fetchUser } from 'ducks/user';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router';

import Charlist from './charlist/Charlist';
import { UserRoute } from './routes/UserRoute';

const App: FC = () => {
  const dispatch = useDispatch();

  auth?.onAuthStateChanged((user) => {
    if (user) {
      dispatch(fetchUser());
      dispatch(loginSuccess());
    } else {
      dispatch(logoutSuccess());
    }
  });

  return (
    <>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path={ROUTE.AUTH} element={<AuthPage />} />
        </Route>
        <Route element={<UserRoute />}>
          <Route path={ROUTE.HOME} element={<MainPage />} />
          <Route element={<PageWithNavbar />}>
            <Route path={ROUTE.CHARLIST} element={<Charlist />} />
            <Route path={ROUTE.ME} element={<UserPage />} />
            <Route path={ROUTE.SETTINGS} element={<UserSettingsComponent />}>
              <Route
                path={`${ROUTE.SETTINGS}/:page`}
                element={<UserSettingsComponent />}
              />
            </Route>
            <Route path={ROUTE.PAGE_404} element={<NotFoundPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
