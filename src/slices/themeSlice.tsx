import { createSlice } from "@reduxjs/toolkit";

interface ThemeState {
  darkMode: boolean;
}

const initialState = {
  darkMode: JSON.parse(localStorage.getItem("darkMode") || ""),
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", state.darkMode);
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export const getTheme = (state:{theme: ThemeState}) => state.theme.darkMode;


export default themeSlice.reducer;