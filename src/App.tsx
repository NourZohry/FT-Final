import { useEffect, useState } from "react";
import "./App.css";
import { DrawerComponent } from "./components/Drawer/DrawerComponent";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { lightTheme, darkTheme } from "./config/themeconfig";

import { useSelector } from "react-redux";
import { getTheme } from "./slices/themeSlice";

function App() {
  return (
    <ThemeProvider theme={useSelector(getTheme) ? darkTheme : lightTheme}>
      <CssBaseline />
      <DrawerComponent />
    </ThemeProvider>
  );
}

export default App;
