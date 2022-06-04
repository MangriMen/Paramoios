import { ThemeProvider, createTheme } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from './AppRoutes';

const theme = createTheme({
  typography: {
    fontFamily: 'Eberron',
  },
  palette: {
    primary: {
      main: '#681e22',
    },
    secondary: {
      main: '#e9c996',
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
