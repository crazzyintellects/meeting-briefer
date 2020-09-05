import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import "./App.css";
import HomePage from "./components/HomePage/HomePage";

const font = "Nunito";
const theme = createMuiTheme({
  typography: {
    fontFamily: font,
    color : `#274e67`,
  },
  palette: {
    primary: {
      light: "#84a9c6",
      main: "#557a95",
      dark: "#274e67",
      contrastText: "#fff",
    },
    secondary: {
      light: "#fa7697",
      main: "#c44569",
      dark: "#8f073f",
      contrastText: "#000",
    },
  },
});

function App() {
  return (
    <>
    <CssBaseline >
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <HomePage />
        </div>
      </MuiThemeProvider>
      </CssBaseline >
    </>
  );
}

export default App;
