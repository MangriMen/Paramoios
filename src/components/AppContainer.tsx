import NavbarComponent from "./NavbarComponent";
import MainPageComponent from "./MainPageComponent";
import { Route, Routes } from "react-router";
import UserComponent from "./UserComponent";
import UserDisplay from "./UserDisplay";
import LoginComponent from "./auth/LoginComponent";
import AuthPageComponent from "./auth/AuthPageComponent";

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
              <LoginComponent />
              <UserComponent />
              <UserDisplay />
            </>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default AppContainer;
