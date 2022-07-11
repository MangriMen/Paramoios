import Charlist from 'components/charlist/Charlist';
import PageWithMainToast from 'components/layout/PageWithMainToasts';
import PageWithNavbar from 'components/layout/PageWithNavbar';
import AuthPage from 'components/pages/AuthPage';
import MainPage from 'components/pages/MainPage';
import NotFoundPage from 'components/pages/NotFoundPage';
import UserPage from 'components/pages/UserPage';
import { AuthRoute } from 'components/routes/AuthRoute';
import { UserRoute } from 'components/routes/UserRoute';
import { UserSettingsComponent } from 'components/user/UserSettingsComponent';
import { auth } from 'configs/firebase';
import { ROUTE } from 'consts';
import { loginSuccess, logoutSuccess } from 'ducks/auth';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router';

const App: FC = () => {
  const dispatch = useDispatch();

  auth?.onAuthStateChanged((user) => {
    if (user) {
      dispatch(loginSuccess());
    } else {
      dispatch(logoutSuccess());
    }
  });

  return (
    <>
      <Routes>
        <Route element={<PageWithMainToast />}>
          <Route element={<AuthRoute />}>
            <Route path={ROUTE.AUTH} element={<AuthPage />} />
          </Route>
          <Route element={<UserRoute />}>
            <Route path={ROUTE.HOME} element={<MainPage />} />
            <Route element={<PageWithNavbar />}>
              <Route path={ROUTE.CHARLIST} element={<Charlist />} />
              <Route path={ROUTE.ME} element={<UserPage />} />
              <Route path={ROUTE.PAGE_404} element={<NotFoundPage />} />
              <Route
                path={ROUTE.SETTINGS}
                element={<UserSettingsComponent />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
