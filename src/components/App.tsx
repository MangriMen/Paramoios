import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import AppContainer from "./AppContainer";

const theme = createTheme({
  typography: {
    fontFamily: "Eberron",
  },
  palette: {
    primary: {
      main: "#681e22",
    },
    secondary: {
      main: "#e9c996",
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppContainer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
