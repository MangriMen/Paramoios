import { Route, Routes } from 'react-router';

import MainPageComponent from './MainPageComponent';
import AuthPageComponent from './auth/AuthPageComponent';
import PageWithNavbar from './layout/PageWithNavbar';
import UserPageComponent from './user/UserPageComponent';

function AppContainer() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <PageWithNavbar>
              <MainPageComponent />
            </PageWithNavbar>
          }
        ></Route>
        <Route path="/auth" element={<AuthPageComponent />}></Route>
        <Route
          path="/user"
          element={
            <PageWithNavbar>
              <UserPageComponent />
            </PageWithNavbar>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default AppContainer;
