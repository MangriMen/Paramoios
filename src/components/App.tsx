import { ThemeProvider } from '@mui/material';
import { auth } from 'configs/firebase';
import { loginSuccess, logoutSuccess } from 'ducks/auth';
import { selectTheme } from 'ducks/localSettings/selectors';
import { fetchUser } from 'ducks/user';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { AppRoutes } from './AppRoutes';

const App: FC = () => {
  const dispatch = useDispatch();

  const theme = useSelector(selectTheme);

  auth?.onAuthStateChanged((user) => {
    if (user) {
      dispatch(fetchUser());
      dispatch(loginSuccess());
    } else {
      dispatch(logoutSuccess());
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
