import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: JSON.parse(localStorage.getItem("darkMode")),
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
export const getTheme = (state) => state.theme.darkMode;


export default themeSlice.reducer;