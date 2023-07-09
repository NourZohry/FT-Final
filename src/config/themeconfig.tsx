import { createTheme } from "@mui/material";
// import React from "react";

// type ThemeProp = {
//   children: JSX.Element;
// };

export enum commonPalette {
  FONT_GLOBAL = "'Plus Jakarta Sans', sans-serif",
  MEDIUMGREY = "#828FA3",
  PURPLE = "#635FC7",
  LIGHTPURPLE = "#A8A4FF",
  RED = "#EA5555",
  LIGHTRED = "#FF9898",
  BUTTON_SECONDARY_IDLE = "#efeff9",
  BUTTON_SECONDARY_HOVER = "#d8d7f1",
}

export enum lightThemePalette {
  BG = "#FFFFFF",
  BG2 = "#F4F7FD",
  BG3 = "#F4F7FD",
  BG4 = "#E9EFFA",
}

export enum darkThemePalette {
  BG = "#12181b",
  BG2 = "#20212C",
  BG3 = "#2B2C37",
  BG4 = "#2B2C37",
}

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: lightThemePalette.BG3,
    },
    primary: {
      main: commonPalette.PURPLE,
      light: "#EAF0FB",
      dark: commonPalette.MEDIUMGREY,
    },
    secondary: {
      light: lightThemePalette.BG3,
      main: lightThemePalette.BG2,
      dark: commonPalette.MEDIUMGREY,
    },
    error: {
      main: commonPalette.RED,
      light: commonPalette.LIGHTRED,
    },
    info: {
      light: lightThemePalette.BG,
      main: commonPalette.BUTTON_SECONDARY_IDLE,
      dark: commonPalette.BUTTON_SECONDARY_HOVER,
    },
  },
  typography: {
    fontFamily: commonPalette.FONT_GLOBAL,
  },
  components: {
    MuiFab: {
      defaultProps: {
        sx: {
          position: "fixed",
          bottom: "20px",
          // left: "-10px",
          borderTopLeftRadius: "0px",
          borderBottomLeftRadius: "0px",

          "&:hover": {
            backgroundColor: commonPalette.LIGHTPURPLE,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        sx: {
          textTransform: "none",
          boxShadow: "none",
          borderRadius: "20px",

          "&:hover": {
            backgroundColor: commonPalette.LIGHTPURPLE,
            color: "#FFFFFF",
            // borderRadius: "0 50px 50px 0",
            textTransform: "none",
            boxShadow: "none",
            borderRadius: "20px",
          },
        },
      },
    },
    MuiListItem: {
      defaultProps: {
        sx: {
          "&:hover": {
            backgroundColor: commonPalette.PURPLE + "1A",
            color: commonPalette.PURPLE,
            borderRadius: "0 50px 50px 0",
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: commonPalette.PURPLE,
            color: "#FFFFFF",
            borderRadius: "0 50px 50px 0",
            "&:hover": {
              backgroundColor: commonPalette.PURPLE,
            },
            "&& .MuiTouchRipple-rippleVisible": {
              //TODO: idk if this does anything
              animationDuration: "0ms",
            },
          },
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: darkThemePalette.BG3,
    },
    primary: {
      main: commonPalette.PURPLE,
      light: "#23242F",
      dark: "#FFFFFF"
    },
    secondary: {
      light: darkThemePalette.BG3,
      main: darkThemePalette.BG2,
      dark: commonPalette.MEDIUMGREY,
    },
    error: {
      main: commonPalette.RED,
      light: commonPalette.LIGHTRED,
    },
    info: {
      light: darkThemePalette.BG4,
      main: commonPalette.BUTTON_SECONDARY_IDLE,
      dark: commonPalette.BUTTON_SECONDARY_HOVER,
    },
  },
  typography: {
    fontFamily: commonPalette.FONT_GLOBAL,
  },
  components: {
    MuiFab: {
      defaultProps: {
        sx: {
          position: "fixed",
          bottom: "20px",
          // left: "-10px",
          borderTopLeftRadius: "0px",
          borderBottomLeftRadius: "0px",

          "&:hover": {
            backgroundColor: commonPalette.LIGHTPURPLE,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: {
        sx: {
          textTransform: "none",
          boxShadow: "none",
          borderRadius: "20px",

          "&:hover": {
            backgroundColor: commonPalette.LIGHTPURPLE,
            color: "#FFFFFF",
            textTransform: "none",
            boxShadow: "none",
            borderRadius: "20px",
          },
        },
      },
    },
    MuiListItem: {
      defaultProps: {
        sx: {
          "&:hover": {
            backgroundColor: commonPalette.PURPLE + "1A",
            color: commonPalette.PURPLE,
            borderRadius: "0 50px 50px 0",
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        root: {
          "& .MuiDrawer-paper": {
            backgroundColor: darkThemePalette.BG4,
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          "&.Mui-selected": {
            backgroundColor: commonPalette.PURPLE,
            color: "#FFFFFF",
            borderRadius: "0 50px 50px 0",
            "&:hover": {
              backgroundColor: commonPalette.PURPLE,
            },
            "&& .MuiTouchRipple-rippleVisible": {
              //TODO: idk if this does anything
              animationDuration: "0ms",
            },
          },
        },
      },
    },
  },
});

export { lightTheme, darkTheme };

// export const ThemeConfig: React.FC<ThemeProp> = ({ children }) => {
//   return (
//     <ThemeProvider theme={lightTheme}>
//       <CssBaseline />
//       {children}
//     </ThemeProvider>
//   );
// };
