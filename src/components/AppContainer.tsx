import { Route, Routes } from 'react-router';

import MainPageComponent from './MainPageComponent';
import AuthPageComponent from './auth/AuthPageComponent';
import NavbarComponent from './common/NavbarComponent';
import UserPageComponent from './user/UserPageComponent';

function AppContainer() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NavbarComponent />
              <MainPageComponent />
            </>
          }
        ></Route>
        <Route path="/auth" element={<AuthPageComponent />}></Route>
        <Route
          path="/user"
          element={
            <>
              <NavbarComponent />
              <UserPageComponent />
            </>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default AppContainer;
