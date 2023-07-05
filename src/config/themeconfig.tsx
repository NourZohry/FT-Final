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
}

export enum lightThemePalette {
  BG = "#FFFFFF",
  BG2 = "#F4F7FD",
  BG3 = "#F4F7FD",
}

export enum darkThemePalette {
  BG = "#12181b",
  BG2 = "#2B2C37",
  BG3 = "#20212C",
}

const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: lightThemePalette.BG,
    },
    primary: {
      main: commonPalette.PURPLE,
    },
    secondary: {
      light: lightThemePalette.BG3,
      main: lightThemePalette.BG2,
      dark: commonPalette.MEDIUMGREY,
    },
  },
  typography: {
    fontFamily: commonPalette.FONT_GLOBAL,
  },
  components: {
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
          }
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: commonPalette.PURPLE,
                        color: "#FFFFFF",
            borderRadius: "0 50px 50px 0",
            "&:hover": {
              backgroundColor: commonPalette.PURPLE
            },
            '&& .MuiTouchRipple-rippleVisible': { //TODO: idk if this does anything
              animationDuration: '0ms',
            }
          }
        }
      }
    }
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: darkThemePalette.BG,
    },
    primary: {
      main: commonPalette.PURPLE,
    },
    secondary: {
      light: darkThemePalette.BG3,
      main: darkThemePalette.BG2,
      dark: commonPalette.MEDIUMGREY,
    },
  },
  typography: {
    fontFamily: commonPalette.FONT_GLOBAL,
  },
  components: {
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
          }
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: commonPalette.PURPLE,
                        color: "#FFFFFF",
            borderRadius: "0 50px 50px 0",
            "&:hover": {
              backgroundColor: commonPalette.PURPLE
            },
            '&& .MuiTouchRipple-rippleVisible': { //TODO: idk if this does anything
              animationDuration: '0ms',
            }

          }
        }
      }
    }
  },
});

export {lightTheme, darkTheme};

// export const ThemeConfig: React.FC<ThemeProp> = ({ children }) => {
//   return (
//     <ThemeProvider theme={lightTheme}>
//       <CssBaseline />
//       {children}
//     </ThemeProvider>
//   );
// };
