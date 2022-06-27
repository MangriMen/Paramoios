import { auth } from 'configs/firebase';
import { ROUTE } from 'consts';
import { loginSuccess, logoutSuccess } from 'ducks/auth';
import { fetchUser } from 'ducks/user';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router';

import MainPage from './charlist/MainPage';
import PageWithNavbar from './layout/PageWithNavbar';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';
import UserPage from './pages/UserPage';
import { UserSettingsComponent } from './user/UserSettingsComponent';

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
        <Route path={ROUTE.ROOT}>
          <Route path={ROUTE.AUTH} element={<AuthPage />} />
        </Route>
        <Route path={ROUTE.ROOT} element={<PageWithNavbar />}>
          <Route path={ROUTE.HOME} element={<MainPage />} />
          <Route path={ROUTE.ME} element={<UserPage />} />
          <Route path={ROUTE.PAGE_404} element={<NotFoundPage />} />
          <Route path={ROUTE.SETTINGS} element={<UserSettingsComponent />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
