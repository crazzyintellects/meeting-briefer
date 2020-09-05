import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from "@material-ui/core/styles";

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

const useStyles = makeStyles((theme) => ({
   appContainer: {
     maxWidth: `92vw`,
     margin: `3.5rem auto`,
     backgroundColor: `#f3f5f9`,
     boxShadow: `0 2rem 4rem rgba(0,0,0,.3)`,
     borderRadius: `1rem`,
 
     //minHeight: `50rem`,
   },
  
 }));

function App() {
  const classes = useStyles();
  return (
    <>
    <CssBaseline >
      <MuiThemeProvider theme={theme}>
        <div className={classes.appContainer}>
          <HomePage />
        </div>
      </MuiThemeProvider>
      </CssBaseline >
    </>
  );
}

export default App;
