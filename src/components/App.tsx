import { ThemeProvider } from '@mui/material';
import { auth } from 'configs/firebase';
import { loginSuccess, logoutSuccess } from 'ducks/auth';
import { initDataRequest, reloadDataRequest } from 'ducks/data';
import { selectTheme } from 'ducks/localSettings/selectors';
import { fetchUser } from 'ducks/user';
import { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './AppRoutes';

const App: FC = () => {
  const dispatch = useDispatch();

  const theme = useSelector(selectTheme);

  useEffect(() => {
    dispatch(initDataRequest());
    dispatch(reloadDataRequest());
  }, [dispatch]);

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
      <Helmet>
        <meta name="theme-color" content={theme.palette.primary.main} />
      </Helmet>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
