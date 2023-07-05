import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

export const themeSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setOpen: (state) => {
      state.isOpen = true;
    },
    setClosed: (state) => {
      state.isOpen = false;
    },
  },
});

export const { setOpen, setClosed } = themeSlice.actions;
export const getIsOpen = (state) => state.modal.isOpen;

export default themeSlice.reducer;
