import { auth } from 'configs/firebase';
import { ROUTE } from 'consts';
import { loginSuccess, logoutSuccess } from 'ducks/auth';
import { fetchUser } from 'ducks/user';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router';

import PageWithNavbar from './layout/PageWithNavbar';
import AuthPage from './pages/AuthPage';
import MainPage from './pages/MainPage';
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
      dispatch(logoutSuccess);
    }
  });

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
              <UserSettingsComponent />
            </PageWithNavbar>
          }
        />
      </Routes>
    </>
  );
};

export default App;
