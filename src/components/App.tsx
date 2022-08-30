import { ThemeProvider } from '@mui/material';
import { auth } from 'configs/firebase';
import { loginSuccess, logoutSuccess } from 'ducks/auth';
import { initDataRequest, reloadDataRequest } from 'ducks/data';
import { selectTheme } from 'ducks/localSettings/selectors';
import { fetchUser } from 'ducks/user';
import { FC, useEffect } from 'react';
import { DndProvider } from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
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
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <DndProvider options={HTML5toTouch}>
          <AppRoutes />
        </DndProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
