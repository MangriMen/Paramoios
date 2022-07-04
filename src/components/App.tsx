import MainPage from 'components/charlist/MainPage';
import PageWithNavbar from 'components/layout/PageWithNavbar';
import AuthPage from 'components/pages/AuthPage';
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
          <Route element={<PageWithNavbar />}>
            <Route path={ROUTE.HOME} element={<MainPage />} />
            <Route path={ROUTE.ME} element={<UserPage />} />
            <Route path={ROUTE.PAGE_404} element={<NotFoundPage />} />
            <Route path={ROUTE.SETTINGS} element={<UserSettingsComponent />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
